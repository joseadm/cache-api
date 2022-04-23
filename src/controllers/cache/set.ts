import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';

const get: RequestHandler = async (req: Request, res) => {
  const { cacheKey } = req.params;
  console.log(`Cache to get: ${cacheKey}`);

  const cache = await Cache.findOne({key: cacheKey});
  if (!cache) {
    // Cache is not found create one
    console.log("Cache miss");
    let randomString = (Math.random() + 1).toString(36).substring(7)
    const cache = new Cache({ cacheKey, randomString});
    await cache.save();

    return res.status(200).send({
      value: randomString
    });
  }

  console.log("Cache hit");
  return res.status(200).send({
    cache: cache.toJSON()
  });
};

export default requestMiddleware(get);
