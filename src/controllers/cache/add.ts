import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import Cache from '../../models/Cache';
import requestMiddleware from '../../middleware/request-middleware';

export const addBookSchema = Joi.object().keys({
  key: Joi.string().required(),
  value: Joi.string().required()
});

interface AddReqBody {
  key: string;
  value: string;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { key, value } = req.body;

  const cache = new Cache({ key, value });
  await cache.save();

  res.send({
    message: 'Saved',
    book: cache.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addBookSchema } });
