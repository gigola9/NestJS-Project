import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleWare } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';
import { NextFunction, Request, Response } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ValidateCustomerMiddleWare).forRoutes(
    //   {
    //     path: 'customers/search/:id',
    //     method: RequestMethod.GET
    //   },
    //   {
    //     path: 'customers/:id',
    //     method: RequestMethod.GET
    //   }
    // );
    consumer.apply(ValidateCustomerMiddleWare, ValidateCustomerAccountMiddleware,
      (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.log('Last Middleware');
        next();
      }
    ).exclude(
      {
        path: 'api/customers/create',
        method: RequestMethod.POST
      },
      {
        path: 'api/customers',
        method: RequestMethod.GET
      }
    ).forRoutes(CustomersController);
  }
}
