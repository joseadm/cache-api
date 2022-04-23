import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cache from '../../models/Cache';

const removeAll: RequestHandler = async (req: Request, res) => {
  await Cache.deleteMany();
  return res.status(200).send({message: "All cache removed"});
};

export default requestMiddleware(removeAll);
