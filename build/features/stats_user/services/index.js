import { BaseService } from "../../../abstracts/service.base";
import { dbSource } from "../../../config/data.source";
import { StatsUser } from "../entities";
export class StatsUserService extends BaseService {
    repo = dbSource.getRepository(StatsUser);
    constructor() {
        super("Stats User", StatsUser);
    }
    async get(thematic) {
    }
}
