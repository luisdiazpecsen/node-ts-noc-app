import { EmailService, SendMailOptions } from '../../src/presentation/email/email.service';
import nodemailer from 'nodemailer';

describe('EmailService', () => {

    const mockSendMail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should send email', async () => {

        const options: SendMailOptions = {
            to: 'lucho03diazpecsen@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>',
        };

        const emailSent = await emailService.sendEmail(options);
        // expect(emailSent).toBeTruthy();
        expect(mockSendMail).toHaveBeenCalledWith({ "attachments": expect.any(Array), "html": "<h1>Test</h1>", "subject": "Test", "to": "lucho03diazpecsen@gmail.com" });
    });

    test('should send email with attachments', async () => {
        const email = 'lucho03diazpecsen@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            "to": email,
            "subject": "Server logs",
            "html": expect.any(String),
            "attachments": expect.arrayContaining([{ "filename": "logs-all.log", "path": "./logs/logs-all.log" }, { "filename": "logs-high.log", "path": "./logs/logs-high.log" }, { "filename": "logs-medium.log", "path": "./logs/logs-medium.log" }]),
        });
    });
});