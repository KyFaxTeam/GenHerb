import BaseController from "../../../abstracts/controller.base";
import { StatsUserService } from "../services";
export default class StatsUserController extends BaseController {
    constructor() {
        super(new StatsUserService());
    }
    // Function to retrieve a limit quiz questions of thmatic from the database  
    // TODO:  I need to use the previously written pick function work
    get = this.catchAsync(async (req, res) => {
    });
}
