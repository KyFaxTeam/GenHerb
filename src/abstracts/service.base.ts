import { DataSource } from "typeorm";
import { dbSource } from "../config/data.source";

export abstract class BaseService {
    // postgresql pool 
    public db : DataSource;

    // Postgresql table Name
    public table: string ;

    public constructor(table:string) {
        this.db = dbSource;
        this.table = table ;
    }

}