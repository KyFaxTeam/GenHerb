import { Entity, Repository } from "typeorm";
import { dbSource } from "../config/data.source";

export abstract class BaseService {
    // postgresql pool 
    public repository : Repository<any>;

    // Postgresql table Name
    public table: string ;

    public constructor(table:string, entity: any) {
        this.repository = dbSource.getRepository(entity);
        this.table = table ;
    }

}