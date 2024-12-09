import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class MailService {
    private transport: nodemailer.Transporter

    constructor() {
        const { GMAIL_HOST, GMAIL_PORT, GMAIL_USER, GMAIL_PASS } = process.env

        this.transport = nodemailer.createTransport({
            host: GMAIL_HOST,
            port: +GMAIL_PORT,
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            }
        })
    }

    async sendRestPassword(to: string, token: string) {
        const { BASE_URL, GMAIL_USER } = process.env
        const resetLink = `${BASE_URL}/reset-password?token=${token}`
        const mailOptions: MailOptions = {
            from: GMAIL_USER,
            to,
            subject: 'Reset Password Request',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`
        }


        await this.transport.sendMail(mailOptions)
    }
}
