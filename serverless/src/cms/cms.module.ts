import { CmsController } from './cms.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '../.env' });

@Module({
  imports: [],
  controllers: [CmsController],
  exports: [CmsService],
  providers: [CmsService],
})
export class CmsModule {}
