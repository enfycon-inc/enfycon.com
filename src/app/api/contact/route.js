import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const verifyRecaptcha = async ({ token, action }) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
        if (process.env.NODE_ENV === "production") {
            return "reCAPTCHA is not configured.";
        }

        console.warn("RECAPTCHA_SECRET_KEY is missing. Skipping reCAPTCHA verification in non-production.");
        return null;
    }

    if (!token) {
        return "Missing reCAPTCHA token.";
    }

    const body = new URLSearchParams({
        secret,
        response: token,
    });

    const verifyResponse = await fetch(RECAPTCHA_VERIFY_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    const verification = await verifyResponse.json();

    if (!verification.success) {
        console.warn("reCAPTCHA verification failed:", verification);
        return "reCAPTCHA verification failed.";
    }

    if (action) {
        if (!verification.action) {
            return "reCAPTCHA action missing.";
        }

        if (verification.action !== action) {
            return "reCAPTCHA action mismatch.";
        }
    }

    const scoreThreshold = parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || "0.5");
    const score = typeof verification.score === "number" ? verification.score : 0;

    if (score < scoreThreshold) {
        return "reCAPTCHA score too low.";
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
            recaptchaToken,
            recaptchaAction,
        } = await request.json();

        const recaptchaError = await verifyRecaptcha({
            token: recaptchaToken,
            action: recaptchaAction,
        });

        if (recaptchaError) {
            return NextResponse.json({ success: false, error: recaptchaError }, { status: 400 });
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
