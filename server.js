import express from 'express';
import { PORT, IP } from './config.js';
import bodyParser from 'body-parser';
import { bodyErrorHandling } from './middleware/bodyErrorHandling.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(authRoutes);
app.use(bodyErrorHandling);

app.listen(PORT, IP, () => console.log(`iniciado en http://${IP}:${PORT}`));
