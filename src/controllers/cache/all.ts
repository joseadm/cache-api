import { RequestHandler } from 'express';
import Cache from '../../models/Cache';

const all: RequestHandler = async (req, res) => {
  const caches = await Cache.find();
  //let result = caches.map(cache => {key: cache.key});
  res.send({ caches });
};

export default all;
