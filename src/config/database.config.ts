import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'teams',
  // url: process.env.MONGODB_URI,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
