/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const http = require('http');
const app = require('./app');

const { env } = process;
const svc = env.SVC_NAME || 'Cloudinary';
const host = env.HOST || 'localhost';
const port = Number(env.PORT) || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Backend server Cloudinary is running at localhost:${port}`);
});
