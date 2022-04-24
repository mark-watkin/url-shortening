import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/index.route';
import { config } from './config';

const app: Express = express();

app.use(cors())
app.use(bodyParser.json())
app.use(routes);

// todo add error handling

app.listen(config.app.port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${config.app.port}`);
});