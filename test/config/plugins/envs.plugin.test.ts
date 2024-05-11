import { envs } from '../../../src/config/plugins/envs.plugin';

describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'lucho03diazpecsen@gmail.com',
            MAILER_SECRET_KEY: 'ieromyuwlxvvmtgd',
            PROD: false,
            MONGO_URL: 'mongodb://luis:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'luis',
            MONGO_PASS: '123456789'
        });
    });

    test('shoudl return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('../../../src/config/plugins/envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

        console.log(envs);
    });
});