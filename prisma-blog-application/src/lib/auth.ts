import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    trustedOrigins: [
        process.env.APP_URL!
    ],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

            const info = await transporter.sendMail({
                from: `"Prisma App" <${process.env.SMTP_USER}>`,
                to: user.email,
                subject: "Please verify your email",
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verify Your Email</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f7fb; color: #333333;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fb; padding: 40px 10px;">
                        <tr>
                            <td align="center">
                                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
                                    <!-- Header -->
                                    <tr>
                                        <td align="center" style="background-color: #4f46e5; padding: 30px 20px; color: #ffffff;">
                                            <h1 style="margin: 0; font-size: 28px;">Prisma App</h1>
                                            <p style="margin: 10px 0 0; font-size: 14px;">Email Verification</p>
                                        </td>
                                    </tr>
                
                                    <!-- Email Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <h2 style="margin-top: 0; color: #111827; font-size: 24px;">Verify Your Email Address</h2>
                                            <p style="font-size: 16px; line-height: 1.7; color: #4b5563;">
                                                Hello ${user.name || "there"},
                                            </p>
                                            <p style="font-size: 16px; line-height: 1.7; color: #4b5563;">
                                                Thank you for creating an account with Prisma App! Please verify your email address by clicking the button below.
                                            </p>
                
                                            <!-- Verification Button -->
                                            <table cellpadding="0" cellspacing="0" align="center" style="margin: 30px auto;">
                                                <tr>
                                                    <td align="center" bgcolor="#4f46e5" style="border-radius: 8px;">
                                                        <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 15px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 8px;">
                                                            Verify Email Address
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                
                                            <p style="font-size: 14px; line-height: 1.7; color: #6b7280;">
                                                If the button doesn't work, copy and paste the following link into your browser:
                                            </p>
                                            <p style="font-size: 13px; line-height: 1.7; word-break: break-all;">
                                                <a href="${verificationUrl}" style="color: #4f46e5;">
                                                    ${verificationUrl}
                                                </a>
                                            </p>
                                            <p style="font-size: 14px; line-height: 1.7; color: #6b7280;">
                                                If you didn't create an account, you can safely ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                
                                    <!-- Footer -->
                                    <tr>
                                        <td align="center" style="background-color: #f9fafb; padding: 20px; border-top: 1px solid #e5e7eb;">
                                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                                &copy; ${new Date().getFullYear()} Prisma App. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                                `,
            });

            console.log("Verification email sent:", info.messageId);
        },
    },
});
