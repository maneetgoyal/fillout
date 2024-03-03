import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response } from 'express';
import type { FilloutQueryParams } from './interfaces.js';

dotenv.config();

axios.defaults.headers.common['Authorization'] =
  `Bearer ${process.env.API_KEY}`;
const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Fillout!');
});

app.get(
  '/:formId/filteredResponses',
  (
    req: Request<{ formId: string }, unknown, unknown, FilloutQueryParams>,
    res: Response,
    next,
  ) => {
    axios
      .get(
        `https://api.fillout.com/v1/api/forms/${req.params.formId}/submissions`,
        { params: req.query },
      )
      .then(({ data }) => {
        res.send(data);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('Error message: ', err.message);
        } else {
          console.log('Unexpected error: ', err);
        }
        next(err);
      });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}.`);
});
