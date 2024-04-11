import httpServer from './src//app';

import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;


httpServer.listen(3000, () => console.log(`server listening on port : ${3000}`));
