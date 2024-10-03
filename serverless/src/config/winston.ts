import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  format: winston.format.colorize(),
  exitOnError: false,
  transports: isProduction
    ? new WinstonCloudWatch({
        name: 'Truthy CMS',
        awsOptions: {
          credentials: {
            accessKeyId: process.env.WINSTON_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.WINSTON_AWS_SECRET_ACCESS_KEY,
          },
        },
        logGroupName: process.env.WINSTON_GROUP_NAME,
        logStreamName: process.env.WINSTON_STREAM_NAME,
        awsRegion: process.env.WINSTON_AWS_REGION,
        messageFormatter: function (item) {
          return (
            item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
          );
        },
      })
    : new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Truthy Logger', {
            prettyPrint: true,
          }),
        ),
      }),
} as WinstonModuleOptions;
