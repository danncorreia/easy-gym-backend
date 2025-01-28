import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri:
    process.env.MONGODB_URI ||
    `mongodb+srv://apiAccess:${process.env.MONGODB_PASSWORD}@easy-gym.yenac.mongodb.net/?retryWrites=true&w=majority&appName=easy-gym`,
}));
