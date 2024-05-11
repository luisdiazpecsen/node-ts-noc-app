import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';
import { EmailService } from '../../../../src/presentation/email/email.service';

describe('SendEmailLogs UseCase', () => {

    const mockService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
    };

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const sendEmailLogs = new SendEmailLogs(mockService as any, mockRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog', async () => {
        const result = await sendEmailLogs.execute('lucho03diazpecsen@gmail.com');

        expect(result).toBeTruthy();
        expect(mockService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({ "createdAt": expect.any(Date), "level": "low", "message": "Email sent", "origin": "send-email-logs.ts" });
    });

    test('should log in case of error', async () => {
        mockService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('lucho03diazpecsen@gmail.com');

        expect(result).toBeFalsy();
        expect(mockService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({ "createdAt": expect.any(Date), "level": "high", "message": "Error: Email log not sent", "origin": "send-email-logs.ts" });
    });
});