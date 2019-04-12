import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});

export default app;
