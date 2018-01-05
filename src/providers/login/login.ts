import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {AppStorageProvider} from "../app-storage/app-storage";
import {Usuario} from "../../models/usuario";

@Injectable()
export class LoginProvider {
    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider,
                private appStorage: AppStorageProvider) {

        console.log('Hello LoginProvider Provider');
    }

    public loginWithSavedUser(): Promise<Usuario> {
        let email = '';
        let password = '';

        return this.appStorage.getLoginEmail()
            .then((loginEmail) => {
                console.log('hay email guardado: ' + loginEmail);
                email = loginEmail;
                return this.appStorage.getLoginPassword()
            })
            .then((loginPasword) => {
                console.log('hay password guardado: ' + loginPasword);
                password = loginPasword;
                return this.loginWithCredentials(email, password);
            }).catch(error => {
                this.globalVariables.userLogged = false;
            });
    }

    public loginWithCredentials(email: string, password: string): Promise<Usuario> {
        const url = this.globalVariables.host + '/login';

        const params = {
            email: email,
            password: password,
        };

        return new Promise<Usuario>((resolve, reject) => {
            this.http.post(url, params)
                .toPromise()
                .then((response) => {
                    console.log('POST request', response.url);
                    this.globalVariables.userLogged = true;
                    this.globalVariables.id_usuario = response.json().id_usuario;
                    resolve(response.json() as Usuario);
                })
                .catch((error) => {
                    console.log('POST request error', error);
                    this.globalVariables.userLogged = false;
                    reject(error.json());
                });
        });
    }

    public logout() {
        this.appStorage.deleteLoginData();
        this.globalVariables.resetUserData();
    }

}
