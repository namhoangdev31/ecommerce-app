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
const winston = __importStar(require("winston"));
const nest_winston_1 = require("nest-winston");
const winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
const config = __importStar(require("config"));
const isProduction = process.env.NODE_ENV === 'production';
const winstonConfig = config.get('winston');
exports.default = {
    format: winston.format.colorize(),
    exitOnError: false,
    transports: isProduction
        ? new winston_cloudwatch_1.default({
            name: 'Truthy CMS',
            awsOptions: {
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY || winstonConfig.awsAccessKeyId,
                    secretAccessKey: process.env.AWS_KEY_SECRET || winstonConfig.awsSecretAccessKey,
                },
            },
            logGroupName: process.env.CLOUDWATCH_GROUP_NAME || winstonConfig.groupName,
            logStreamName: process.env.CLOUDWATCH_STREAM_NAME || winstonConfig.streamName,
            awsRegion: process.env.CLOUDWATCH_AWS_REGION || winstonConfig.awsRegion,
            messageFormatter: function (item) {
                return (item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta));
            },
        })
        : new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('Truthy Logger', {
                prettyPrint: true,
            })),
        }),
};
//# sourceMappingURL=winston.js.map