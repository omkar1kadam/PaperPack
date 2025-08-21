require('dotenv').config();

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 2402;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
