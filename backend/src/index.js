import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
// import { Env } from './constants/env.js';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(routes());

const PORT = 3000;
app.listen(PORT);
console.log(`🚀 Server on port http://localhost:${PORT}`);
