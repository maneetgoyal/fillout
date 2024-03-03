import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response } from 'express';

dotenv.config();

axios.defaults.headers.common['Authorization'] =
  `Bearer ${process.env.API_KEY}`;
const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Fillout!');
});

app.get('/:formId/filteredResponses', (req: Request, res: Response) => {
  axios
    .get(`https://api.fillout.com/v1/api/forms/${req.params.formId}`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.errors);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}.`);
});
