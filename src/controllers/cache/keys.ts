import { RequestHandler } from 'express';
import Cache from '../../models/Cache';
import requestMiddleware from '../../middleware/request-middleware';

const keys: RequestHandler = async (req, res) => {
  const caches = await Cache.find();
  let keys = caches.map(cache => cache.key);
  res.send({ keys });
};

export default requestMiddleware(keys);
