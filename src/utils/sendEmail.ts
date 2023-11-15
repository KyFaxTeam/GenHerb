import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'your-smtp-host',
      port: 587,
      secure: false,
      auth: {
        user: 'your-smtp-username',
        pass: 'your-smtp-password',
      },
    });
  }

  async sendResetPasswordEmail(to: string, resetToken: string): Promise<void> {
    // Email Body
    const emailContent = `
    <p>You requested to reset your password.</p>
    <p>Click on the following link to reset your password:</p>
    <a href="http://your-app.com/reset-password?token=${resetToken}">Reset Password</a>
    <p>If you didn't request this reset, you can ignore this email.</p>
  `;

    // Email Options
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'kyfaxgroup@gmail.com',
      to: to,
      subject: 'Password Reset',
      html: emailContent,
    };

    // Send Email
    await this.transporter.sendMail(mailOptions);
  }
}
