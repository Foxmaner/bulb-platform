const httpServer = require('./dist/app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3001;


httpServer.httpServer.listen(port, () => console.log(`server listening on port : ${port}`));
