import { MongoDatabase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';

describe('Pruebas en MongoLogDatasource', () => {
    const logDataSource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts',
    });

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterEach(async () => {
        await LogModel.deleteMany();
    });

    afterAll(async () => {
        // await LogModel.deleteMany();

        mongoose.connection.close();
    });

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
    });

    test('should get logs', async () => {
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});