import { Module, ValidationPipe } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '../../configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.cwd() + '/.env'
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    RolesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ],
})
export class AppModule { }
