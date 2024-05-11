import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';

describe('CheckService UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://google.coms');
        expect(wasOk).toBeFalsy();
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});