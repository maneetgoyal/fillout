import axios from 'axios';
import express from 'express';
import type { Express, Request, Response } from "express";

axios.defaults.headers.common['Authorization'] =
  'Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
const app: Express = express();
const port = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Fillout!');
});

app.get('/:formId/filteredResponses', (req: Request, res: Response) => {
  axios.get(`https://api.fillout.com/v1/api/forms/${req.params.formId}`).then(({ data }) => {
    res.send(data);
  }).catch((err) => {
    console.log(err.errors);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
