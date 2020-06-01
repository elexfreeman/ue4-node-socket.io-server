import * as express from 'express';
import { conf } from "./Module/Config/Config";

import { fClientCtrl } from "./ClientCtrl";
import { db } from "./Module/Sys/db";

const app = require('express')();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

/* заглушка для индексной страницы */
app.get('/', (req: express.Request, res: express.Response) => {
  res.send({});
});


io.on('connection', fClientCtrl);


http.listen(conf.common.port, () => {
  console.log(`listening on *:${conf.common.port}`);
});