import { Module, Scope } from '@nestjs/common'
import { CmsService } from './cms.service'
import { HttpAdapterHost } from '@nestjs/core'
import payload, { Payload } from "payload";
import { ConfigService } from '@nestjs/config'
import config from './payload.config'
import { InitOptions } from "payload/config";

@Module({
  providers: [
    CmsService,
    {
      provide: 'CMS',
      inject: [HttpAdapterHost, ConfigService],
      scope: Scope.DEFAULT, // Singleton
      useFactory: async (httpAdapterHost: HttpAdapterHost, configService: ConfigService) => {
        return await payload.init(
          <InitOptions>{
            config: Promise.resolve(undefined),
            disableDBConnect: false,
            disableOnInit: false,
            email: undefined,
            express: undefined,
            local: false,
            logger: undefined,
            loggerDestination: undefined,
            loggerOptions: undefined,
            onInit(payload: Payload): Promise<void> | void {
              return undefined;
            },
            secret: ""
          }
        )
      },
    },
  ],
  exports: [CmsService, 'CMS'],
})
export class CmsModule {
}