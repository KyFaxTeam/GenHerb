import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";
import config from "../../../config";
import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";

import {  StatsUser } from "../entities";


export class StatsUserService extends BaseService<StatsUser> {

    private repo = dbSource.getRepository(StatsUser);
    public constructor() {
        super("Stats User", StatsUser);
    }

    public async get(thematic:string): Promise<any> {
    }

}