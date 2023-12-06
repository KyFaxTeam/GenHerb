"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Joi = __importStar(require("joi"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const entities_1 = require("../features/quiz/entities");
const entities_2 = require("../features/auth/entities");
const entities_3 = require("../features/events/entities");
const entities_4 = require("../features/stats_event/entities");
dotenv_1.default.config();
// { path  : path.join(__dirname, "../../.env.dev")}
class Config {
    constructor() {
        var _a, _b;
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
            if (((_a = error.details[0].context) === null || _a === void 0 ? void 0 : _a.key) != "GJS_DEBUG_TOPICS" && ((_b = error.details[0].context) === null || _b === void 0 ? void 0 : _b.key) != "ALLUSERSPROFILE") {
                console.log("Error : ", error);
                throw new apiError_1.default({ status: http_status_1.default.INTERNAL_SERVER_ERROR, message: "Server Error" });
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
            entities: [entities_1.Quiz, entities_3.Event, entities_2.User, entities_4.StatsEvent]
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
exports.default = Config.getInstance();
