import express from 'express'
import cors from 'cors'
import router from './routes/animeRouter.js';
import dbConnect from './db/db.js';

const app = express();
app.use(cors());

app.use(express.json());

dbConnect();

app.use('/user', router)

app.listen(5000, () => {
  console.log("Server started on port 5000")
})