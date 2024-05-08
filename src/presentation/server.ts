import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

/**
 * Cambiar el data source según sea necesario
 */
const currentLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');

        // CRON Service
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    currentLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url);
            },
        );

        // Email Service
        new SendEmailLogs(
            emailService,
            currentLogRepository
        ).execute([
            'lucho03diazpecsen@gmail.com',
        ]);
    }
}