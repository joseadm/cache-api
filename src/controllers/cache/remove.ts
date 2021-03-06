import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';

const remove: RequestHandler = async (req: Request, res) => {
  const { key } = req.params;

  const cache = await Cache.findOne({key});
  if (!cache) {
    return res.status(404).send({
      error: 'Cache not found'
    });
  }

  await cache.delete();
  return res.status(204).send();
};

export default requestMiddleware(remove);
