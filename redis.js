const redis = require("redis");

const redisClient = redis.createClient({ host: process.env.REDIS_HOST });

redisClient.on("connect", () => {
  console.log("Redis connection established...");
});

const setCache = (key, value) =>
  new Promise((resolve, reject) => {
    redisClient.set(key, JSON.stringify(value), (error, reply) => {
      if (error) reject(error);
      resolve(reply);
    });
  });

const getCached = (key) =>
  new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) reject(err);
      if (reply) resolve(JSON.parse(reply));
      resolve(null);
    });
  });

const clearCached = (key) =>
  new Promise((resolve, reject) => {
    redisClient.del(key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  });

const setCacheExp = (key, milliseconds, value) =>
  new Promise((resolve, reject) => {
    redisClient.psetex(key, milliseconds, JSON.stringify(value), (error, reply) => {
      if (error) reject(error);
      resolve(reply);
    });
  });

const addKeyTime = (key, milliseconds) =>
  new Promise((resolve, reject) => {
    redisClient.pexpire(key, milliseconds, (error, reply) => {
      if (error) reject(error);
      resolve(reply);
    });
  });

const getCacheKeys = (pattern) =>
  new Promise((resolve, reject) => {
    redisClient.keys(pattern, (error, reply) => {
      if (error) reject(error);
      resolve(reply);
    });
  });

const checkKeyExists = (key) =>
  new Promise((resolve, reject) => {
    redisClient.exists(key, (error, reply) => {
      if (error) reject(error);
      resolve(reply === 1);
    });
  });

module.exports = { redisClient, setCache, getCached, clearCached, setCacheExp, addKeyTime, getCacheKeys, checkKeyExists };
