import dotenv from "dotenv";
import * as Joi from "joi";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";
import { Quiz } from "../features/quiz/entities";
import { User } from "../features/auth/entities";
import { Event } from "../features/events/entities";
import { StatsEvent } from "../features/stats_event/entities";
dotenv.config();
// { path  : path.join(__dirname, "../../.env.dev")}
class Config {
    static instance;
    dbConfig;
    logDirectory;
    server;
    env;
    limitQuiz;
    secretKey;
    constructor() {
        const envVarSchema = Joi.object().keys({
            //  Env
            NODE_ENV: Joi.string().required().valid("development", "production", "test"),
            PORT: Joi.number().default(3000),
            // Database
            POSTGRES_USER: Joi.string().required().description("User name for postgresql database"),
            POSTGRES_HOST: Joi.string().required().description("Postgresql database Host Name"),
            POSTGRES_DATABASE: Joi.string().required().description("Postgresql database Name"),
            POSTGRES_PASSWORD: Joi.string().required().description("Postgresql database Password"),
            POSTGRES_PORT: Joi.number().required(),
            SUPABASE_POSTGRESQL_URL: Joi.string().required().description("The supabase url for excute postgresql request"),
            JWT_SECRET_KEY: Joi.string().required().description("JsonWebToken Secret Key"),
            JWT_EMAIL_CONFIRM_DELAY: Joi.number().integer().description("Number of minutes expiration of email validation link"),
            LOG_DIRECTORY: Joi.string().required().description("Directory content all log files"),
            LIMIT_QUIZ: Joi.number().required().description("The maw number of quiz to send a user")
        });
        const { value: envVars, error } = Joi.compile(envVarSchema).prefs({ errors: { label: "key" } }).validate(process.env);
        if (error) {
            /**
             * ! the next condition allow to resolve this error from `Joi` package
             * [
                    {
                        message: '"GJS_DEBUG_TOPICS" is not allowed',
                        path: [ 'GJS_DEBUG_TOPICS' ],
                        type: 'object.unknown',
                        context: {
                        child: 'GJS_DEBUG_TOPICS',
                        label: 'GJS_DEBUG_TOPICS',
                        value: 'JS ERROR;JS LOG',
                        key: 'GJS_DEBUG_TOPICS'
                        }
                    }
                    ]
             */
            if (error.details[0].context?.key != "GJS_DEBUG_TOPICS" && error.details[0].context?.key != "ALLUSERSPROFILE") {
                console.log("Error : ", error);
                throw new ApiError({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Server Error" });
            }
        }
        this.logDirectory = envVars.LOG_DIRECTORY;
        this.dbConfig = {
            type: "postgres",
            host: envVars.POSTGRES_HOST,
            port: envVars.POSTGRES_PORT,
            username: envVars.POSTGRES_USER,
            password: envVars.POSTGRES_PASSWORD,
            database: envVars.POSTGRES_DATABASE,
            url: envVars.SUPABASE_POSTGRESQL_URL,
            entities: [Quiz, Event, User, StatsEvent]
        };
        this.server = {
            port: envVars.PORT,
            host: envVars.HOST
        };
        this.env = envVars.NODE_ENV;
        this.limitQuiz = envVars.LIMIT_QUIZ;
        this.secretKey = envVars.JWT_SECRET_KEY;
    }
    /**
   * Get the singleton instance of the Config class
   * @returns {Config} The singleton instance
   */
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
}
export default Config.getInstance();
