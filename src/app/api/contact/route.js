import { NextResponse } from "next/server";
import { sendMail } from "@/libs/graphClient";
import { sanitizeContactForm } from "@/libs/security";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const verifyTurnstile = async ({ token, ip }) => {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        if (process.env.NODE_ENV === "production") {
            return "Turnstile is not configured.";
        }

        console.warn("TURNSTILE_SECRET_KEY is missing. Skipping Turnstile verification in non-production.");
        return null;
    }

    if (!token) {
        return "Missing Turnstile token.";
    }

    const body = new URLSearchParams({
        secret,
        response: token,
    });

    if (ip) {
        body.set("remoteip", ip);
    }

    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    const verification = await verifyResponse.json();

    if (!verification.success) {
        console.warn("Turnstile verification failed:", verification);
        return "Turnstile verification failed.";
    }

    return null;
};

export async function POST(request) {
    try {
        const rawData = await request.json();

        // 1. Sanitize and Validate Inputs
        const { isValid, cleanedData, errors } = sanitizeContactForm(rawData);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: errors.join(" ") },
                { status: 400 }
            );
        }

        const {
            firstName,
            lastName,
            email,
            mobile,
            subject,
            message,
        } = cleanedData;

        // Turnstile Token is separate (not part of cleaned content data usually, but passed for verification)
        const turnstileToken = rawData.turnstileToken;

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
        const turnstileError = await verifyTurnstile({
            token: turnstileToken,
            ip,
        });

        if (turnstileError) {
            return NextResponse.json({ success: false, error: turnstileError }, { status: 400 });
        }

        // Helper to capitalize first letter
        const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
        const capitalizedFirstName = capitalize(firstName);

        // Helper for email template
        const getEmailTemplate = (content, previewText) => `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${previewText}</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 0; text-align: center;">
                        <img src="https://enfycon.com/images/logos/enfycon-white.png" alt="enfycon" style="height: 40px; width: auto; display: block; margin: 0 auto;">
                    </div>

                    <!-- Content -->
                    <div style="padding: 40px 48px;">
                        ${content}
                    </div>
                   
                    <!-- Footer -->
                    <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                            &copy; ${new Date().getFullYear()} enfycon. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Admin Email Content (Table View)
        const adminBody = `
            <h2 style="color: #111827; margin-top: 0; font-size: 20px; font-weight: 600; padding-bottom: 16px; border-bottom: 2px solid #5755d9; margin-bottom: 24px;">New Contact Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${mobile}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Subject</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${subject}</td>
                </tr>
            </table>

            <div style="margin-top: 24px;">
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Message:</p>
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; color: #374151; line-height: 1.6; font-size: 15px;">
                    ${message}
                </div>
            </div>
        `;

        const adminContent = getEmailTemplate(adminBody, `New Inquiry: ${subject}`);

        // User Confirmation Email Content
        const signatureHTML = `
            <div style="font-family: Arial, Helvetica, sans-serif; color: #333333; margin-top: 30px; font-size: 14px; line-height: 1.4;">
                <p style="margin: 0 0 10px 0; color: #333333;">Thank you,</p>
                
                <h4 style="font-size: 15px; font-weight: normal; margin: 0 0 5px 0; color: #1a2b4b;">
                    <span style="font-weight: normal; color: #0056b3;">enfycon Team</span>
                    <span style="color: #333333;"> | </span>
                    <span style="color: #0056b3;">enfycon Inc.</span>
                </h4>
                
                <p style="margin: 0 0 15px 0; color: #333333;">USA | INDIA | UAE</p>

                <div style="margin-bottom: 15px;">
                     <p style="margin: 0;">
                        <span style="font-weight: 700;">A:</span> 3921 Long Prairie Road, Building 5, Flower Mound, TX – 75028
                    </p>
                    <p style="margin: 2px 0 0 0;">
                        <span style="font-weight: 700;">D:</span> <a href="tel:+12012017878" style="color: #333333; text-decoration: none;">+1 201-201-7878</a>
                    </p>
                </div>

                <div style="margin-bottom: 20px;">
                    <a href="mailto:info@enfycon.com" style="color: #0056b3; text-decoration: none;">info@enfycon.com</a>
                    <span style="color: #333333; margin: 0 5px;"> | </span>
                    <a href="https://www.enfycon.com" style="color: #0056b3; text-decoration: none;">www.enfycon.com</a>
                </div>

                <div style="width: 100%; max-width: 500px;">
                    <img src="https://enfycon.com/images/email-banner.jpeg" alt="Empowering Business with Technology" style="width: 100%; height: auto; display: block;">
                </div>
            </div>
        `;

        const userBody = `
            <p style="font-size: 16px; color: #111827; margin-bottom: 24px;">Hello <strong>${capitalizedFirstName} ${lastName}</strong>,</p>
            
            <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px; color: #374151;">
                Thank you for reaching out to enfycon. We’ve received your inquiry regarding our services.
            </p>
            
            <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px; color: #374151;">
                Our team is currently reviewing your message and one of our specialists will get back to you within 24–48 business hours.
            </p>

            <p style="font-size: 15px; line-height: 1.7; margin-bottom: 24px; color: #374151;">
                If your request is urgent, feel free to reply to this email with additional details so we can assist you faster.
            </p>
            
            ${signatureHTML}
        `;

        const userContent = getEmailTemplate(userBody, "Thank you for contacting enfycon");

        if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET || !process.env.AZURE_TENANT_ID || !process.env.AZURE_USER_ID) {
            console.log("\x1b[33m%s\x1b[0m", "--- Contact Form Demo Mode ---");
            console.log("Data received:", { firstName, lastName, email, mobile, subject, message });
            console.log("To enable real emails, please set AZURE credentials in the .env file");
            console.log("\x1b[33m%s\x1b[0m", "------------------------------");

            return NextResponse.json({
                success: true,
                message: "Form submitted (DEMO MODE). To receive real emails, please configure Azure credentials."
            });
        }

        const adminEmail = process.env.AZURE_USER_ID;

        // Helper to parse recipients
        const getRecipients = () => {
            const recipientsVar = process.env.ADMIN_EMAIL_RECIPIENTS;
            if (!recipientsVar) return [adminEmail];

            let list = [];
            try {
                const parsed = JSON.parse(recipientsVar);
                if (Array.isArray(parsed)) {
                    list = parsed;
                } else {
                    // Could be a single string in JSON format
                    list = [String(parsed)];
                }
            } catch (e) {
                // Raw string
                list = [recipientsVar];
            }

            // Flatten and split any comma-separated strings inside the list
            return list
                .flatMap(item => String(item).split(","))
                .map(email => email.trim())
                .filter(email => email.length > 0 && email.includes("@"));
        };

        const recipients = getRecipients();

        // Send both emails using Graph API
        await Promise.all([
            sendMail({
                subject: `New Contact Form Submission: ${subject}`,
                content: adminContent,
                toRecipients: recipients
            }),
            sendMail({
                subject: `We have received your inquiry: ${subject}`,
                content: userContent,
                toRecipients: [email]
            })
        ]);

        return NextResponse.json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
    }
}
