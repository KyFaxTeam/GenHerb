import BaseController from "../../../abstracts/controller.base";
import { successResponseFormat } from "../../../utils/success.response.send";
import { StatsEventService } from "../services";
export default class StatsEventController extends BaseController {
    constructor() {
        super(new StatsEventService());
    }
    getStatWithEventId = this.catchAsync(async (req, res) => {
        const { id } = req.query;
        const result = await this.service.getStatsWithEventId(id);
        // Send the result as the response. getOwnStats
        res.send(successResponseFormat(result));
    });
    getOwnStats = this.catchAsync(async (req, res) => {
        const { pseudo } = req.query;
        const result = await this.service.getOwnStats(pseudo);
        // Send the result as the response. getOwnStats
        res.send(successResponseFormat(result));
    });
    postStats = this.catchAsync(async (req, res) => {
        const data = req.body;
        await this.service.postStatsEvent(data);
    });
}
