import nodemailer from 'nodemailer'
import config from '../config.js'

export default class Mail {

    constructor() {
        this.transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.MAIL_APP,
            pass: config.MAIL_APP_PASSWORD
        }
        })
    }

    send = async (user, subject, html) => {
        const result = await this.transport.sendMail({
        from: config.MAIL_APP,
        to: user.email,
        subject,
        html
        })

        return result
    }

    sendByMail = async (mail, subject, html) => {
        const result = await this.transport.sendMail({
        from: config.MAIL_APP,
        to: mail,
        subject,
        html
        })

        return result
    }
}