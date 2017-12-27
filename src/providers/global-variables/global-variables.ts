import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVariablesProvider {
    public host: string = 'http://localhost:8000/api';
    public hostNoPort = 'http://localhost';
    public id_usuario: number;
    public email: string;
    public password: string;

    constructor() {
        console.log('Hello GlobalVariablesProvider Provider');
    }

}
