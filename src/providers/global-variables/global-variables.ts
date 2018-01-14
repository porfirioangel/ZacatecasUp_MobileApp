import {Injectable} from '@angular/core';
import {Server} from "./server";

@Injectable()
export class GlobalVariablesProvider {
    public apiUrl: string = Server.apiUrl;
    public hostUrl = Server.hostUrl;

    public userLogged: boolean;
    public id_usuario: number;
    public email: string;
    public password: string;

    constructor() {
        console.log('Hello GlobalVariablesProvider Provider');
    }

    public resetUserData() {
        this.id_usuario = 0;
        this.email = null;
        this.password = null;
        this.userLogged = false;
    }

}
