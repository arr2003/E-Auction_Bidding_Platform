// Production environment configuration

export const environment = {
  production: true,
  apiUrl: 'https://api.e-auction-platform.com/api',
  database: {
    // In a real production environment, these values would be set through environment variables
    // or a secure configuration management system, not hardcoded
    host: process.env["DB_HOST"] || 'production-db-host',
    port: parseInt(process.env["DB_PORT"] || '5432'),
    username: process.env["DB_USERNAME"] || 'db_user',
    password: process.env["DB_PASSWORD"] || 'secure_password',
    database: process.env["DB_NAME"] || 'e_auction_db_prod'
  }
};