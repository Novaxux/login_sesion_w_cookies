import DBLocal from 'db-local';
const { Schema } = new DBLocal({ path: './db' });
import userSchema from './schemas/user.schema.js';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config.js';

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static async create({ username, password }) {
    userSchema.parse({ username, password });

    const user = User.findOne({ username });
    if (user) throw new Error('Username already exists');
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();
    return id;
  }

  static async login({ username, password }) {
    userSchema.parse({ username, password });

    const user = User.findOne({ username });
    if (!user) throw new Error('Username does not exist');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Password is incorrect');

    const { password: _, ...publicUser } = user;
    return publicUser;
  }
}
