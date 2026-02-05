import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
        const {
            firstName,
            lastName,
            email,
            mobile,
            subject,
            message,
            turnstileToken,
        } = await request.json();

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
        const turnstileError = await verifyTurnstile({
            token: turnstileToken,
            ip,
        });

        if (turnstileError) {
            return NextResponse.json({ success: false, error: turnstileError }, { status: 400 });
        }

        // Create a transporter using custom SMTP settings
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "465"),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER || "imsahadeb@gmail.com",
                pass: process.env.EMAIL_PASS,
            },
        });

        const adminMailOptions = {
            from: `"enfycon Contact" <${process.env.EMAIL_USER || "imsahadeb@gmail.com"}>`,
            to: "imsahadeb@gmail.com",
            subject: `New Contact Form Submission: ${subject}`,
            text: `
                Name: ${firstName} ${lastName}
                Email: ${email}
                Mobile: ${mobile}
                Subject: ${subject}
                Message: ${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        const userMailOptions = {
            from: `"enfycon Support" <${process.env.EMAIL_USER || "imsahadeb@gmail.com"}>`,
            to: email,
            subject: `Confirmation: We received your message - ${subject}`,
            text: `
                Hi ${firstName},

                Thank you for contacting enfycon! We have received your message regarding "${subject}".
                Our team will review your request and get back to you shortly.

                Best regards,
                enfycon Team
            `,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #007bff;">Hello ${firstName},</h2>
                    <p>Thank you for reaching out to <strong>enfycon</strong>!</p>
                    <p>We have received your message regarding <strong>"${subject}"</strong> and our team is already looking into it.</p>
                    <p>You can expect a response from us within the next 24-48 hours.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 14px; color: #777;">
                        Best regards,<br />
                        <strong>enfycon Team</strong>
                    </p>
                </div>
            `,
        };

        // For now, if EMAIL_PASS is not set, we'll just log and return success for demo
        if (!process.env.EMAIL_PASS) {
            console.log("\x1b[33m%s\x1b[0m", "--- Contact Form Demo Mode ---");
            console.log("Data received:", { firstName, lastName, email, mobile, subject, message });
            console.log("To enable real emails, please create a .env file with EMAIL_PASS=your_app_password");
            console.log("\x1b[33m%s\x1b[0m", "------------------------------");

            return NextResponse.json({
                success: true,
                message: "Form submitted (DEMO MODE). To receive real emails, please set your Google App Password in the .env file."
            });
        }

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        return NextResponse.json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
    }
}
