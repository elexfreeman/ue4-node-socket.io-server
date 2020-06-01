import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { FieldValidator } from '@a-a-game-studio/aa-components/lib';
import { UserSQL } from './UserSQL';

export interface BaseResponseI {
   ok: boolean;
   data: any;
   errors: any;
}


export namespace UserLogin {

   export interface RequestI {
      login: string;
      pswd: string;
   }

   export const sResponse = 'user_login_resp';

   export interface ResponseI extends BaseResponseI {
      data: {
         token: string;
      }
   }
}

/**
 * Контролер пользователя
 */

export const faUserLogin = async (socket: any, msg: any, errorSys: AAClasses.Components.ErrorSys, db: any) => {
   const userSQL = new UserSQL(errorSys, db);
   const fieldValidator = new FieldValidator(errorSys, {});

   let sToken = '';

   try {
      const data: UserLogin.RequestI = JSON.parse(msg);

      fieldValidator.fSetErrorString('login')
         .fSetData(data.login)
         .fExist()
         .fMinLen(3)
         .fMaxLen(50);

      fieldValidator.fSetErrorString('paswd')
         .fSetData(data.pswd)
         .fExist()
         .fMinLen(3)
         .fMaxLen(50);

         

         if(!fieldValidator.fIsOk()){
            throw 'error';
         }

         sToken = await userSQL.faGetTokenByLoginAndPass(data.login, data.pswd);

         fieldValidator.fSetErrorString('token')
         .fSetData(sToken)
         .fExist()
         .fMinLen(32)
         .fMaxLen(32);


   } catch (e) {
      fieldValidator.fSetErrorString('all bad')
      .fSetData(null)
      .fExist(e);
      
   }

   const resp: UserLogin.ResponseI = {
      ok: fieldValidator.fIsOk(),
      data: {token: sToken},
      errors: fieldValidator.fGetErrorSys().getErrors()
   }

   socket.emit(UserLogin.sResponse, resp);

   console.log('faUserLogin msg', msg);

}