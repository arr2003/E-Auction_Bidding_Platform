import { environment } from '../../../environments/environment';

export const databaseConfig = {
  dialect: 'postgres',
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.database,
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
};