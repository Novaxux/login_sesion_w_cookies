import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '0.0.0.0';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

export { PORT, IP, SALT_ROUNDS };
