import nodemailer from 'nodemailer';
import ApiError from './apiError';
import logger from './logger';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
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
      from: process.env.EMAIL,
      to: to,
      subject: 'Password Reset',
      html: emailContent,
    };

    try {
      // Send Email
      await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error, e.g., throw an exception or log it
      throw new ApiError({status: 400, message: 'Failed to send verification email'});

    }
  }

  async sendResetPasswordEmail(to: string, resetToken: string, newPassword: string): Promise<void> {
    // Email Body
    const emailContent = `
    <p>You requested to reset your password.</p>
    <p>Click on the following link to reset your password:</p>
    <a href= "http://localhost:3001/geh/api/v1/auth/reset-password/:${resetToken}?new_password= ${newPassword}">Reset Password</a>
    <p>If you didn't request this reset, you can ignore this email.</p>
  `;

    // Email Options
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: 'Password Reset',
      html: emailContent,
    };

    // Send Email
    try {
      // Send Email
      await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error, e.g., throw an exception or log it
      throw new ApiError({status: 400, message: 'Failed to send verification email'});
    }
  }
}
