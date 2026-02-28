import nodemailer from 'nodemailer'

type EmailConfig = {
  to: string
  subject: string
  html: string
  text: string
  headers: Record<string, string>
}

export async function sendEmail({ to, subject, html, text = '' }: EmailConfig) {
  console.log(process.env.EMAIL)
  console.log(process.env.EMAIL_PASSWORD)
  return new Promise(async (resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    })
    const mailOptions = {
      from: {
        name: 'Tech Triangle',
        address: process.env.EMAIL as string,
      },
      to,
      subject,
      html,
      text,
      headers: {
        References: Math.random().toString(36).substring(7),
      },
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error)
      else resolve(info)
    })
  })
}
