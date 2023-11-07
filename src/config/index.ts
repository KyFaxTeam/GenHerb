/**
 * 
 * This class initialize all config parameter from .env file
 * 
 * Declare all global system variables
 * 
 */
import path from "path";
require('dotenv').config() 
import * as Joi from "joi";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";

class Config {

    private static instance: Config;

    public dbConfig : {
            type: string,
            host: string,
            port: number,
            username: string,
            password: string,
            database: string,
            entities: [],
            url : string
    }

    public logDirectory: string 

    public server : {
        port : number,
        host : string,
    }

    public env: string;

    private constructor() {
        const envVarSchema = Joi.object().keys({
            //  Env
            NODE_ENV: Joi.string().required().valid("development", "production", "test"),
            PORT: Joi.number().default(3000),
            
            // Database
            POSTGRES_USER : Joi.string().required().description("User name for postgresql database"),
            POSTGRES_HOST : Joi.string().required().description("Postgresql database Host Name"),
            POSTGRES_DATABASE : Joi.string().required().description("Postgresql database Name"),
            POSTGRES_PASSWORD : Joi.string().required().description("Postgresql database Password"),
            POSTGRES_PORT : Joi.number().required(),
            SUPABASE_POSTGRESQL_URL : Joi.string().required().description("The supabase url for excute postgresql request"),

            JWT_SECRET_KEY: Joi.string().required().description("JsonWebToken Secret Key"),
            JWT_EMAIL_CONFIRM_DELAY: Joi.number().integer().description("Number of minutes expiration of email validation link"),

            LOG_DIRECTORY : Joi.string().required().description("Directory content all log files")
        });

        const {value: envVars, error} = Joi.compile(envVarSchema).prefs({errors : {label : "key"}}).validate(process.env) ;

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
            if(error.details[0].context?.key != "GJS_DEBUG_TOPICS") {
                throw new ApiError({status : httpStatus.INTERNAL_SERVER_ERROR, message : "Server Error"})
            }
        };

        this.logDirectory = envVars.LOG_DIRECTORY ;
        this.dbConfig = {
            type: 'postgres',
            host : envVars.POSTGRES_HOST,
            port : envVars.POSTGRES_PORT,
            username : envVars.POSTGRES_USER,
            password : envVars.POSTGRES_PASSWORD,
            database : envVars.POSTGRES_DATABASE,
            url : envVars.SUPABASE_POSTGRESQL_URL,
            entities : []
        };

        

        this.server = {
            port : envVars.PORT,
            host : envVars.HOST
        };
        this.env = envVars.NODE_ENV

    }

      /**
   * Get the singleton instance of the Config class
   * @returns {Config} The singleton instance
   */
    public static getInstance(): Config {
        if (!Config.instance) {
        Config.instance = new Config();
        }
        return Config.instance;
    }
} 

export default Config.getInstance();