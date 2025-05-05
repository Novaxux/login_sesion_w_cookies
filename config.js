import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const IP = process.env.IP;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
export { PORT, IP, SALT_ROUNDS, SECRET_JWT_KEY };
