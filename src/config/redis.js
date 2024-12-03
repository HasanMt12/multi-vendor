const redisModule = require('redis');
const { redis } = require('./index');

const client = redisModule.createClient({
  password: redis[redis.environment].password,
  socket: {
    host: redis[redis.environment].host,
    port: redis[redis.environment].port,
  },
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis client connected');
  } catch (error) {
    console.log('Redis Client Error:', error.message);
  }
  client.on('error', (err) => console.log('Redis Client Error', err));
};

module.exports = { connectRedis, client };
