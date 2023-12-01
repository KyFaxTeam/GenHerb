import { DataSource } from "typeorm";
import Config from "../config";

export const dbSource: DataSource = new DataSource({
    type: "postgres",
    username: Config.dbConfig.username,
    password: Config.dbConfig.password,
    host: Config.dbConfig.host,
    port: Number(Config.dbConfig.port),
    database: Config.dbConfig.database,
    entities: Config.dbConfig.entities,
    // logging: true,
    synchronize: true
});