import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '../../configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.cwd() + '/.env'
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
