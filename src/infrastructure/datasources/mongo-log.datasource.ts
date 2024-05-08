import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
});

export class MongoLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        // await newLog.save();
        console.log('Mongo Log created:', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await LogModel.find({
            level: severityLevel,
        });

        return logs.map(LogEntity.fromObject);
    }

}