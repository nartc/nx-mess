import { ConfigType, registerAs } from '@nestjs/config';

export const mongoConfiguration = registerAs('mongo', () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  dbName: process.env.MONGO_DB_NAME || 'nx-mess-dev',
}));

export type MongoConfig = Readonly<ConfigType<typeof mongoConfiguration>>;
