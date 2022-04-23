import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as CacheController from './controllers/cache';

const router = Router();

// Book routes
router.post('/cache/add', CacheController.add);
router.get('/cache/all', CacheController.all);
router.get('/cache/set/:cacheKey', CacheController.set);
router.get('/cache/get/:cacheKey', CacheController.get);
router.delete('/cache/delete/:cacheKey', CacheController.remove);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
}

export default router;
