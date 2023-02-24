import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5000'
};

app.use(cors(corsOptions));

// app.get('/api', (req, res) => {
//   res.send({name: 'server'});
// });

app.use('/api', router);

app.listen(3300, () => {
  console.log('port', 3300);
  console.log(`App is working at http://3300`);
});