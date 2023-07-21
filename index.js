import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ProductRoute from './routes/ProductRoute.js';
import UserRoute from './routes/UserRoute.js';
import KonsultasiRoute from './routes/KonsultasiRouter.js';
import ArtikelRoute from './routes/ArtikelRouter.js';

dotenv.config();

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://mental-health-chi.vercel.app',
    'https://mental-health-admin.vercel.app',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(ProductRoute);
app.use(KonsultasiRoute);
app.use(ArtikelRoute);
app.use('/', UserRoute);
app.listen(5000, () => console.log('Server running at port 5000'));

// module.exports = app;
