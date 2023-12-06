import { catchAsync } from "../utils/catchAsync";
import pick from "../utils/pick";
export default class BaseController {
    catchAsync;
    pick;
    service;
    constructor(service) {
        this.catchAsync = catchAsync;
        this.pick = pick;
        this.service = service;
    }
}
