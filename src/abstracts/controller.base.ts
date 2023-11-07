import {  catchAsync } from "../utils/catchAsync";
import pick from "../utils/pick";

export default abstract class BaseController {
    protected catchAsync ;
    protected pick ;

    protected service : any ;
    public constructor (service: any) {
        this.catchAsync = catchAsync
        this.pick = pick ;
        this.service = service

    }
}