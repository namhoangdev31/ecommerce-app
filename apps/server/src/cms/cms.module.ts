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
        return await payload.init({
          config: config,
          disableDBConnect: false,
          disableOnInit: false,
          express: httpAdapterHost.httpAdapter.getInstance(),
          local: false,
          onInit: () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
          },
          secret: configService.getOrThrow('cms.secret'),
        })
      },
    },
  ],
  exports: [CmsService, 'CMS'],
})
export class CmsModule {
}
