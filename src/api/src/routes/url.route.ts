import express from 'express';
import { createUrl, getUrls } from '../controllers/url.controller';

export = (() => {
    const router = express.Router();
          
    router.get('/', getUrls);
    router.post('/', createUrl)
    
    return router;
})();