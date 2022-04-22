import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as CacheController from './controllers/cache';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Book routes
router.post('/cache/add', CacheController.add);
router.get('/cache/all', CacheController.all);
router.get('/cache/get/:cacheKey', CacheController.get);
router.delete('/cache/delete/:cacheKey', CacheController.remove);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  //router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
