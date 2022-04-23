import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';
import generateRandomString from "../../helper/generate-random-string";

const set: RequestHandler = async (req: Request, res) => {
  const { key } = req.params;
  console.log(`Cache to get: ${key}`);

  const cache = await Cache.findOne({key});
  if (!cache) {
    // Cache is not found create one
    console.log("Cache miss");
    const randomString = generateRandomString();
    const cache = new Cache({ key, value: randomString});
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

export default requestMiddleware(set);
