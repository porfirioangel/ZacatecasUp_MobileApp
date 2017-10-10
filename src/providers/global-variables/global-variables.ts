import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVariablesProvider {
    public host: string = 'http://localhost:3000';
    public hostNoPort = 'http://localhost';

    constructor() {
        console.log('Hello GlobalVariablesProvider Provider');
    }

}
