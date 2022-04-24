import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../contract/swagger.json';

export = (() => {
    const router = express.Router();
          
    router.use('/', swaggerUi.serve);
    router.get('/', swaggerUi.setup(swaggerDocument));

    return router;
})();