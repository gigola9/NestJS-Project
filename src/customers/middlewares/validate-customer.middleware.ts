import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleWare implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello World');
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send({ error: 'No authentication token provided' });
    }
    if (authorization === '123') {
      next();
    } else {
      return res.status(403).send({ error: 'No authentication token provided' });
    }
  }
}
