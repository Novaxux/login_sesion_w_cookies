import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const IP = process.env.IP;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export { PORT, IP, SALT_ROUNDS };
