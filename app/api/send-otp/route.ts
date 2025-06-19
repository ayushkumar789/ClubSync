import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    try {
        const { to, subject, text } = await req.json()

        if (!to || !subject || !text) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({
            from: `"ClubSync Verification" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Email send error:", error)
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
    }
}
