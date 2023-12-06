import { dbSource } from "../config/data.source";
export class BaseService {
    // postgresql pool 
    repository;
    // Postgresql table Name
    table;
    constructor(table, entity) {
        this.repository = dbSource.getRepository(entity);
        this.table = table;
    }
}
