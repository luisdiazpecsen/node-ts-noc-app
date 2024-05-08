import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

/**
 * Cambiar el data source según sea necesario
 */
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const currentLogRepository = new LogRepositoryImpl(
    // new FileSystemDataSource()
    new MongoLogDatasource()
    // new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');

        // CRON Service
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckService(
        //             currentLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //     },
        // );
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.coms';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url);
            },
        );

        // Email Service
        // new SendEmailLogs(
        //     emailService,
        //     currentLogRepository
        // ).execute([
        //     'lucho03diazpecsen@gmail.com',
        // ]);

        // Log service
        // const logs = await currentLogRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);
    }
}