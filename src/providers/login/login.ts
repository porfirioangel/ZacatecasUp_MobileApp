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
                console.log(error);
            });
    }

    public loginWithCredentials(email: string, password: string): Promise<Usuario> {
        const url = this.globalVariables.apiUrl + '/login';

        const params = {
            email: email,
            password: password,
        };

        return new Promise<Usuario>((resolve, reject) => {
            this.http.post(url, params)
                .toPromise()
                .then((response) => {
                    console.log('POST request', response.url);

                    let usuario = response.json() as Usuario;

                    this.appStorage.saveLoginData(usuario.token, email, password);
                    this.globalVariables.userLogged = true;
                    this.globalVariables.email = usuario.email;
                    this.globalVariables.password = usuario.password;
                    this.globalVariables.id_usuario = usuario.id_usuario;
                    this.globalVariables.token = usuario.token;

                    resolve(usuario);
                })
                .catch((error) => {
                    console.log('POST request error', error);
                    this.appStorage.deleteLoginData();
                    this.globalVariables.resetUserData();
                    reject(error.json());
                });
        });
    }

    public logout() {
        this.appStorage.deleteLoginData();
        this.globalVariables.resetUserData();
    }

}
