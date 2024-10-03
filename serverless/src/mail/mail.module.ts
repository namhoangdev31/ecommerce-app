import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { MailService } from 'src/mail/mail.service';
import { MailProcessor } from 'src/mail/mail.processor';
import { EmailTemplateModule } from 'src/email-template/email-template.module';

@Module({
  imports: [
    EmailTemplateModule,
    BullModule.registerQueueAsync({
      name: process.env.MAIL_QUEUE_NAME,
      useFactory: () => ({
        redis: {
          host: process.env.QUEUE_HOST,
          port: parseInt(process.env.QUEUE_PORT, 10),
          password: process.env.QUEUE_PASSWORD,
          retryStrategy(times) {
            return Math.min(times * 50, 2000);
          }
        }
      })
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT, 10),
          secure: process.env.MAIL_SECURE === 'true',
          ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        },
        defaults: {
          from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_FROM_EMAIL}>`
        },
        preview: process.env.MAIL_PREVIEW === 'true',
        template: {
          dir: __dirname + '/templates/email/layouts/',
          adapter: new PugAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService]
})
export class MailModule {}
