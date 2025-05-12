import express from 'express';
import { PORT, IP, CORS_ORIGIN } from './config.js';
import bodyParser from 'body-parser';
import { bodyErrorHandling } from './middleware/bodyErrorHandling.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth',authRoutes);
app.use(bodyErrorHandling);

app.listen(PORT, IP, () => console.log(`iniciado en http://${IP}:${PORT}`));
