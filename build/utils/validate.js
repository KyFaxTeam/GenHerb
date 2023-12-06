import pick from "./pick";
import Joi from "joi";
import ApiError from "./apiError";
import httpStatus from "http-status";
const valideRequest = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);
    if (error) {
        // throw error;
        return next(new ApiError({ status: httpStatus.BAD_REQUEST, message: error.message }));
    }
    Object.assign(req, value);
    return next();
};
export default valideRequest;
