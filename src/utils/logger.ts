import {createLogger, format, transports} from "winston";
const {combine, timestamp, prettyPrint, splat, printf, colorize, uncolorize} = format ;
import config from "../config";

const logger = createLogger({
    // level: config.env === "development" ? "debug" : "info",
    format: combine(
        splat(),
        timestamp(),
        prettyPrint(),
        config.env === "development" ? colorize() : uncolorize(),
        printf(({level, message, timestamp}) => `${level === "error" ? "🔴": "🟢" } ${timestamp} :: ${level} :: ${message}`)
    ),
    transports: [
        config.env === "development" ? new transports.Console() :
            new transports.File({ filename: `${config.logDirectory}/error.log` }) 
      
    ],
});


export default logger ;