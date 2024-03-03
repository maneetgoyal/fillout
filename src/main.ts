import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import type { AxiosResponse } from 'axios';
import type { Express, Request, Response } from 'express';
import type { FilloutQueryParams, FilloutResponseBody } from './interfaces.js';
import { filterQuestions } from './utils.js';

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
    res: Response<FilloutResponseBody>,
    next,
  ) => {
    axios
      .get<FilloutResponseBody, AxiosResponse<FilloutResponseBody>>(
        `https://api.fillout.com/v1/api/forms/${req.params.formId}/submissions`,
        { params: req.query },
      )
      .then(({ data }) => {
        const responsesPerPage = data.responses.length / data.pageCount;
        const filteredResponses = data.responses.filter(
          (ele) =>
            filterQuestions(ele.questions, req.query.filters).length > 0,
        );
        res.send({
          totalResponses: filteredResponses.length,
          pageCount: Math.ceil(filteredResponses.length / responsesPerPage),
          responses: filteredResponses,
        });
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
