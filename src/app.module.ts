import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 2
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'master2022',
      password: 'master2022',
      database: 'tutorial_db',
      entities: entities,
      synchronize: true
    }),
    AuthModule,
    PassportModule.register({
      session: true
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
