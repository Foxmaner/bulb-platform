const app = require('./dist/app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3001;
const db_uri = process.env.DB_URI;

process.env.NODE_ENV = 'dev';

const { httpServer } = app.run(db_uri)

httpServer.listen(port, () => console.log(`server listening on port : ${port}`));
