/*
 *   Start File for the backend server
*/

const app = require('./dist/app');
const dotenv = require('dotenv');


dotenv.config();

const port = process.env.PORT || 3001;
const db_uri = process.env.DB_URI;

process.env.NODE_ENV = 'DEV';

(async () => {
    const { httpServer } = await app.run();
    httpServer.listen(port, () => console.log(`server listening on port : ${port}`));
  })();