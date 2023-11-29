import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'kyfaxgroup',
        pass: 'JYFE#2W!nn6Rs',
      },
    });
  }

  async sendRegisterEmail(to: string, token: string): Promise<void> {
    // Email Body
    const emailContent = `
    <p>You requested to register in our platform GEH.</p>
    <p>Click on the following link to reset your password:</p>
    <a href="http://your-app.com/verify-email?token=${token}">Reset Password</a>
    <p>If you didn't request this reset, you can ignore this email.</p>
  `;

    // Email Options
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'kyfaxgroup@gmail.com',
      to: to,
      subject: 'Password Reset',
      html: emailContent,
    };

    try {
      // Send Email
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error, e.g., throw an exception or log it
      throw new Error('Failed to send verification email');
    }
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
    try {
      // Send Email
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error, e.g., throw an exception or log it
      throw new Error('Failed to send verification email');
    }
  }
}
