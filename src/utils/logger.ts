import {createLogger, format, transports} from "winston";
const {combine, timestamp, prettyPrint, splat, printf, colorize, uncolorize} = format ;
import config from "../config";


const rootPath = process.env.VERCEL_URL;
const logDir = `https://${rootPath}/${config.logDirectory}`;

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
            new transports.File({ filename: `error.log` }) 
      
    ],
});

// try {
//     logger.info("Message de test");
//     console.log("Logger success");
// } catch (error) {
//     console.log(error)
// }


export default logger ;
