import {
    RequestHandler, Request, Response, NextFunction
  } from 'express';
  import Joi from 'joi';
  import BadRequest from '../errors/bad-request';

  const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
    if (!error.details && error.message) {
      return error.message;
    }
    return error.details && error.details.length > 0 && error.details[0].message
      ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
  };
  
  interface HandlerOptions {
    validation?: {
      body?: Joi.ObjectSchema
    }
  };
  
  export const requestMiddleware = (
    handler: RequestHandler,
    options?: HandlerOptions,
  ): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
    if (options?.validation?.body) {
      const { error } = options?.validation?.body.validate(req.body);
      if (error != null) {
        next(new BadRequest(getMessageFromJoiError(error)));
        return;
      }
    }
  
    try {
      handler(req, res, next);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Error in request handler');
      }
      next(err);
    };
  };
  
  export default requestMiddleware;
  