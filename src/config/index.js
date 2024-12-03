let connectionURI = process.env.DB_CONNECTION_URI;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
connectionURI = connectionURI.replace('<username>', dbUsername);
connectionURI = connectionURI.replace('<db_password>', dbPassword);
const radisHost = process.env.REDIS_HOST;
const radisPort = process.env.REDIS_PORT;
const radisPassword = process.env.REDIS_PASSWORD;
const environment = process.env.NODE_ENV;

module.exports = {
  mongodb: {
    dev: 'mongodb://localhost:27017/gsmartbd',
    prod: connectionURI,
    environment,
  },
  cors: {
    dev: 'http://localhost:5173',
    prod: process.env.FRONTEND_BASEURL,
    environment,
  },
  redis: {
    dev: {
      host: 'localhost',
      port: 6379,
      password: '',
    },
    prod: {
      host: radisHost,
      port: radisPort,
      password: radisPassword,
    },
    environment,
  },
};
