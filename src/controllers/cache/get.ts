import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';

const get: RequestHandler = async (req: Request, res) => {
  const { cacheKey } = req.params;
  console.log(`Cache to get: ${cacheKey}`);

  const cache = await Cache.findOne({key: cacheKey});
  if (!cache) {
    return res.status(404).send({
      error: 'Cache not found'
    });
  }

  return res.status(200).send({
    cache: cache.toJSON()
  });
};

export default requestMiddleware(get);
