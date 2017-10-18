import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariablesProvider} from "../global-variables/global-variables";

@Injectable()
export class LoginProvider {

    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
        console.log('Hello LoginProvider Provider');
    }

    public checkLogin(email: string, password: string): Promise<number> {
        const url = this.globalVariables.host + '/login';

        return new Promise<number>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    console.log('GET request', response.url);
                    resolve(response.json() as number);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }

}
