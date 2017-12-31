import {Injectable} from '@angular/core';
import {Server} from "./server";

@Injectable()
export class GlobalVariablesProvider {
    public host: string = Server.apiUrl;
    public hostNoPort = Server.hostUrl;
    public id_usuario: number;
    public email: string;
    public password: string;

    constructor() {
        console.log('Hello GlobalVariablesProvider Provider');
    }

}
