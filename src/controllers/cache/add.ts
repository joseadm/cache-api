import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import Cache from '../../models/Cache';
import requestMiddleware from '../../middleware/request-middleware';

export const addCacheSchema = Joi.object().keys({
  key: Joi.string().required(),
  value: Joi.string().required()
});

interface AddReqBody {
  key: string;
  value: string;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { key, value } = req.body;

  let count = await Cache.count({});

  // If the maximum amount of cached items is reached, 
  // some old entry needs to be overwritten
  // take the created date to remove oldest

  if(count.toString() === process.env.ENTRIES_LIMIT) {
    await Cache.findOne().sort({created_at: -1}).deleteOne();
  } 

  const cache = new Cache({ key, value });
  await cache.save();

  res.send({
    message: 'Saved',
    book: cache.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addCacheSchema } });
