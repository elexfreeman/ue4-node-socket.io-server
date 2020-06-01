import BaseSQL from "../Sys/BaseSQL";
import { UserE, UserTokenE } from "./UserE";
import * as HashFunc from "../../Lib/HashFunc";

export class UserSQL extends BaseSQL {
      /**
     * Для авторизации
     * Выдает токен по логину и паролю
     * @param login 
     * @param pass 
     * @returns token
     */
    public async faGetTokenByLoginAndPass(sLogin: string, sPass: string): Promise<string> {
        let res = '';

        let sql = `
            SELECT ut.token FROM ${UserE.NAME} u
            JOIN ${UserTokenE.NAME} ut ON u.id=ut.id_user
            WHERE            
                u.login= :login
            AND
                u.pswd= :pswd 
            LIMIT 1
        `;

        try {
            let result = await this.db.raw(sql, {
                'login': sLogin,
                //'pswd': HashFunc.fPassToHash(sPass),  // для примера
                'pswd': sPass,
            });
            res = result[0][0]['token'];
        } catch (e) {
            this.errorSys.errorEx(e, 'get_token_by_login_and_pass', 'Не удалось получить токен по логину и паролю');
        }

        return res;
    }

}