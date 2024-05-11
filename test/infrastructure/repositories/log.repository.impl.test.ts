import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl';

describe('LogRepositoryImpl', () => {

    const mockDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const logRepositoryImpl = new LogRepositoryImpl(mockDataSource);

    test('saveLog should call the datasource with arguments', async () => {
        // const log = new LogEntity({
        //     message: 'test',
        //     level: LogSeverityLevel.low,
        //     origin: 'log.repository.impl.test.ts',
        // });

        const log = {
            level: LogSeverityLevel.low,
            message: 'hola',
            origin: 'this',
        } as LogEntity;

        await logRepositoryImpl.saveLog(log);
        expect(mockDataSource.saveLog).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the datasource with arguments', async () => {
        const lowSeverity = LogSeverityLevel.low;
        await logRepositoryImpl.getLogs(lowSeverity);

        expect(mockDataSource.getLogs).toHaveBeenCalledWith(lowSeverity);
    });
});