import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
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
  providers: [],
})
export class AppModule {}
