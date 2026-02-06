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

        // Helper for email template
        const getEmailTemplate = (content, previewText) => `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${previewText}</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="max-width: 650px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 40px; text-align: center;">
                        <img src="https://enfycon.com/images/logos/enfycon-white.png" alt="enfycon Logo" style="height: 45px; width: auto;">
                    </div>

                    <!-- Content -->
                    <div style="padding: 40px;">
                        ${content}
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                         <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;"><strong>enfycon Headquarters</strong></p>
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 13px; line-height: 1.5;">
                            3921 Long Prairie Road, Building 5,<br>Flower Mound, TX 75028, USA.
                        </p>
                        <div style="margin-top: 20px;">
                            <a href="https://enfycon.com" style="color: #635ad9; text-decoration: none; font-size: 13px; font-weight: 600;">Visit Website</a>
                            <span style="color: #cbd5e1; margin: 0 10px;">|</span>
                            <a href="mailto:office@enfycon.com" style="color: #635ad9; text-decoration: none; font-size: 13px; font-weight: 600;">Contact Support</a>
                        </div>
                        <p style="margin: 20px 0 0 0; color: #94a3b8; font-size: 12px;">
                            &copy; ${new Date().getFullYear()} enfycon. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Admin Email Content (Table View)
        const adminBody = `
            <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; font-weight: 600; border-bottom: 2px solid #635ad9; padding-bottom: 15px; margin-bottom: 25px;">New Contact Submission</h2>
            <p style="color: #475569; margin-bottom: 25px;">You have received a new message from the website contact form.</p>
            
            <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                    <td style="padding: 15px 20px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; width: 30%;">Full Name</td>
                    <td style="padding: 15px 20px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; background-color: #ffffff;">Email Address</td>
                    <td style="padding: 15px 20px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #635ad9; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="background-color: #f8fafc;">
                    <td style="padding: 15px 20px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
                    <td style="padding: 15px 20px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><a href="tel:${mobile}" style="color: #635ad9; text-decoration: none;">${mobile}</a></td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; background-color: #ffffff;">Subject</td>
                    <td style="padding: 15px 20px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${subject}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                    <td style="padding: 15px 20px; font-weight: 600; color: #475569; vertical-align: top;">Message</td>
                    <td style="padding: 15px 20px; color: #1e293b; line-height: 1.6;">${message}</td>
                </tr>
            </table>

            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #635ad9; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Reply to User</a>
            </div>
        `;

        const adminContent = getEmailTemplate(adminBody, `New Inquiry: ${subject}`);

        // User Confirmation Email Content
        const signatureHTML = `
            <div style="font-family: Arial, Helvetica, sans-serif; color: #333333; margin-top: 40px;">
                <p style="margin-bottom: 15px; font-weight: 400; font-size: 14px; color: #333333;">With Warm Regards,</p>
                <h4 style="font-size: 16px; font-weight: 400; margin-bottom: 5px; color: #1a2b4b; margin-top: 5px;">
                    <span style="font-weight: 400; color: #0056b3;">enfycon Team</span>
                    <span style="color: #333333;"> | </span>
                    <span style="color: #0056b3;">enfycon Inc.</span>
                </h4>
                <div style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; font-weight: 400;">
                    <p style="margin-bottom: 0;">USA | INDIA | UAE</p>
                </div>

                <div style="margin-bottom: 20px; font-size: 16px; line-height: 1.5;">
                     <p style="margin-bottom: 5px;">
                        <span style="font-weight: 700; margin-right: 5px;">A:</span> 3921 Long Prairie Road, Building 5<br>Flower Mound, TX – 75028
                    </p>
                    <p style="margin-bottom: 5px;">
                        <span style="font-weight: 700; margin-right: 5px;">D:</span> <a href="tel:+12012017878" style="color: #333333; text-decoration: none;">+1 201-201-7878</a>
                    </p>
                </div>

                <div style="margin-bottom: 25px; font-size: 16px;">
                    <a href="mailto:info@enfycon.com" style="color: #0056b3; text-decoration: underline;">info@enfycon.com</a>
                    <span style="color: #333333; margin: 0 5px;"> | </span>
                    <a href="https://www.enfycon.com" style="color: #0056b3; text-decoration: underline;">www.enfycon.com</a>
                </div>

                <div style="width: 100%;">
                    <img src="https://enfycon.com/images/email-banner.png" alt="Empowering Business with Technology" style="width: 100%; height: auto; display: block;">
                </div>
            </div>
        `;

        const userBody = `
            <h2 style="color: #0f172a; margin-top: 0; font-size: 24px; font-weight: 700;">Hello ${firstName},</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for reaching out to <strong>enfycon</strong>. We have received your message regarding <strong style="color: #635ad9;">"${subject}"</strong>.
            </p>
            <div style="background-color: #f1f5f9; border-left: 4px solid #635ad9; padding: 15px 20px; margin-bottom: 25px; border-radius: 0 4px 4px 0;">
                <p style="margin: 0; color: #334155; font-style: italic;">"Our team is reviewing your inquiry and will get back to you within 24-48 hours."</p>
            </div>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our website to learn more about our services and solutions.
            </p>
            <div style="margin-top: 30px;">
                <a href="https://enfycon.com/services" style="display: inline-block; background-color: #1e293b; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Explore Services</a>
            </div>
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
                subject: `Confirmation: We received your message - ${subject}`,
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
