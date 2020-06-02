import * as express from 'express';
import { conf } from "./Module/Config/Config";
import { fClientCtrl } from "./ClientCtrl";

const app = require('express')();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

/* заглушка для индексной страницы */
app.get('/', (req: express.Request, res: express.Response) => {
  res.send({});
});

/* контролер socket.io */
io.on('connection', fClientCtrl);


http.listen(conf.common.port, () => {
  console.log(`listening on *:${conf.common.port}`);
});