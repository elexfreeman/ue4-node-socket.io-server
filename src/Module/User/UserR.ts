import { BaseResponseI } from "../Sys/ResponseSys";
import { UserI } from "./UserE";

export namespace UserLogin {

    export interface RequestI {
       login: string;
       pswd: string;
    }
 
    export const sResponse = 'user_login_resp';
 
    export interface ResponseI extends BaseResponseI {
       data: {
          token: string;
          user: UserI;
       }
    }
 }
 