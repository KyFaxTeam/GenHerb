import { Entity, Repository, ObjectType, ObjectLiteral } from "typeorm";
import { dbSource } from "../config/data.source";

export abstract class BaseService<T extends ObjectLiteral> {
    // postgresql pool 
    public repository: Repository<T>;

    // Postgresql table Name
    public table: string;

    public constructor(table: string, entity: ObjectType<T>) {
        this.repository = dbSource.getRepository(entity);
        this.table = table;
    }
}
