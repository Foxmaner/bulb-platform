const app = require('./dist/app');
const dotenv = require('dotenv');

dotenv.config();

process.env.FILE_SIZE = process.env.FILE_SIZE || 1024 * 1024 * 10;
process.env.PORT = process.env.PORT || 3001;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.VERIFICATION = process.env.VERIFICATION || 'true';

const { httpServer } = app.run(process.env.DB_URI)

httpServer.listen(process.env.PORT, () => console.log(`server listening on port : ${process.env.PORT}`));
