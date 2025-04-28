import express from 'express';
import { PORT, IP } from './config.js';
import { UserRepository } from './user.repository.js';
import bodyParser from 'body-parser';
import { bodyErrorHandling } from './middleware/BodyErrorHandling.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyErrorHandling);
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    res.send({ user });
  } catch (error) {
    res.status(401).send(error.message);
  }
});
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get('/logout', (req, res) => {});

app.get('/protected', (req, res) => {});

app.listen(PORT, IP, () => console.log(`iniciado en http://${IP}:${PORT}`));
