import { CmsModule } from './cms/cms.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeormConfig';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CmsModule, TypeOrmModule.forRoot(typeOrmConfig), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
