import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';
import findHourDifference from "../../helper/find-hour-difference";
import generateRandomString from "../../helper/generate-random-string";

const get: RequestHandler = async (req: Request, res) => {
  const { key } = req.params;
  console.log(`Cache to get: ${key}`);

  const cache = await Cache.findOne({key});
  if (!cache) {
    return res.status(404).send({
      error: 'Cache not found'
    });
  }

  // If the TTL is exceeded, the cached data
  // will not be used. A new random value will then be generated (just like cache miss).
  else if(findHourDifference(new Date(), cache.updatedAt) > parseInt(process.env.TIME_TO_LIVE_PER_HOUR || '2')) {
    const randomString = generateRandomString();
    const cache = new Cache({ key, value: randomString});
    await cache.save();

    res.send({
      message: 'Updated do to TTL',
      book: cache.toJSON()
    });
  }

  return res.status(200).send({
    cache: cache.toJSON()
  });
};

export default requestMiddleware(get);
