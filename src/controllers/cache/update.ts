import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';

const update: RequestHandler = async (req: Request, res) => {
  const { key, value } = req.params;

  const cache = await Cache.findOneAndUpdate({key}, {value});
  if (!cache) {
    return res.status(404).send({
      error: 'Cache not found'
    });
  }

  return res.status(204).send();
};

export default requestMiddleware(update);
