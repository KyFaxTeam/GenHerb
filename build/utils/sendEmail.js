"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const apiError_1 = __importDefault(require("./apiError"));
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
    }
    sendRegisterEmail(to, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Email Body
            const emailContent = `
    <p>You requested to register in our platform GEH.</p>
    <p>Click on the following link to reset your password:</p>
    <a href="http://your-app.com/verify-email?token=${token}">Reset Password</a>
    <p>If you didn't request this reset, you can ignore this email.</p>
  `;
            // Email Options
            const mailOptions = {
                from: process.env.EMAIL,
                to: to,
                subject: 'Password Reset',
                html: emailContent,
            };
            try {
                // Send Email
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent successfully.');
            }
            catch (error) {
                console.error('Error sending email:', error);
                // Handle the error, e.g., throw an exception or log it
                throw new apiError_1.default({ status: 400, message: 'Failed to send verification email' });
            }
        });
    }
    sendResetPasswordEmail(to, resetToken, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Email Body
            const emailContent = `
    <p>You requested to reset your password.</p>
    <p>Click on the following link to reset your password:</p>
    <a href= "http://localhost:3001/geh/api/v1/auth/reset-password/:${resetToken}?new_password= ${newPassword}">Reset Password</a>
    <p>If you didn't request this reset, you can ignore this email.</p>
  `;
            // Email Options
            const mailOptions = {
                from: process.env.EMAIL,
                to: to,
                subject: 'Password Reset',
                html: emailContent,
            };
            // Send Email
            try {
                // Send Email
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent successfully.');
            }
            catch (error) {
                console.error('Error sending email:', error);
                // Handle the error, e.g., throw an exception or log it
                throw new apiError_1.default({ status: 400, message: 'Failed to send verification email' });
            }
        });
    }
}
exports.EmailService = EmailService;
