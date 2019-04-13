import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import accountsRouter from './routes/accounts';
import validateToken from './middleware/validateToken'

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/accounts',validateToken, accountsRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});

export default app;
