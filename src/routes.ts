import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as CacheController from './controllers/cache';
import apiSpec from '../openapi.json';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};
const router = Router();

// Cache routes
router.post('/cache/add', CacheController.add);
router.get('/cache/keys', CacheController.keys);
router.get('/cache/set/:key', CacheController.set);
router.put('/cache/:key', CacheController.update);
router.get('/cache/:key', CacheController.get);
router.delete('/cache/:key', CacheController.remove);
router.delete('/cache/deleteAll', CacheController.removeAll);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
