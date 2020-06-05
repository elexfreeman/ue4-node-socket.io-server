import * as net from "net";
const moment = require('moment');

import { fGenerateToken } from "./Lib/HashFunc";
import { aSocketClient } from "./Module/Sys/db";

/**
 * Текущая дата
 */
const fGetNowDataStr = (): string => moment().format('DD.MM.YYYY HH:mm:ss');

/**
 * Оработчик сервера
 */
const server = net.createServer((socket: net.Socket) => {

    /* генерируем токен клиенту */
    const clientToken = fGenerateToken();
    aSocketClient[clientToken] = true;

    console.log(`[${fGetNowDataStr()}] Client connect ${clientToken}`);

    /* отправка через интервал  */
    const t = setInterval(() => {
        socket.write('Ping test');
    }, 3000);


    /* получение данных от клиента */
    socket.on('data', (data: Buffer) => {
        console.log(`[${fGetNowDataStr()}] Data from [${clientToken}]: `, data.toString());
    });

    /* клиент отключися */
    socket.on('end', () => {
        clearInterval(t);
        delete aSocketClient[clientToken];
        console.log(`[${fGetNowDataStr()}] Client ${clientToken} disconnect`);
    });

});

/* ошибки сервера */
server.on('error', (err: any) => {
    console.log(`[${fGetNowDataStr()}] Error:`, err);
});


/* запускаем сервер */
server.listen({
    port: 3007, family: 'IPv4', address: '127.0.0.1'
}, () => {
    console.log('opened server on', server.address());
});