import {Injectable} from '@angular/core';

/*
  Generated class for the GlobalVariablesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVariablesProvider {
    // public host: string = 'http://192.168.0.15:3000';
    public host: string = 'http://localhost:3000';

    constructor() {
        console.log('Hello GlobalVariablesProvider Provider');
    }

}
