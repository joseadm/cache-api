import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';

const removeAll: RequestHandler = async (req: Request, res) => {
  await Cache.deleteMany();
  return res.status(204).send();
};

export default requestMiddleware(removeAll);
