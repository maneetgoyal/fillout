import axios from 'axios';
import express from 'express';

axios.defaults.headers.common['Authorization'] =
  'Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/:formId/filteredResponses', (req, res) => {
  axios.get(`/v1/api/forms/${req.params.formId}`).then((response) => {
    res.send(response);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
