import { aSocketClient } from "./Module/Sys/db";
import { db } from "./Module/Sys/db";
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { faUserLogin } from "./Module/User/UserCtrl";

/**
 * Контролер клиентов соединения
 */
export const fClientCtrl = (socket: any) => {

    /* конструктор ошибок */
    const errorSys = new AAClasses.Components.ErrorSys();

    /* помещаем клиента в общую память */
    console.log(`Client: ${socket.id} connect`);
    aSocketClient[socket.id] = true;

    /**
     * событие логина юзера
     */
    socket.on('user_login', (msg: any) => {
        faUserLogin(socket, msg, errorSys, db);
    });

    /**
     * Событие дисконекта
     */
    socket.on('disconnect', (msg: any) => {
        console.log(`Client: ${socket.id} disconnect`);        
        delete aSocketClient[socket.id];
    });

}