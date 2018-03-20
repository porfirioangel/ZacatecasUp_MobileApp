import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {AppStorageProvider} from "../app-storage/app-storage";
import {Usuario} from "../../models/usuario";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Session} from "../../models/session";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

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

    /**
     * Observable que consulta si el usuario se encuentra logueado
     */
    public checkLoginObservable(): Observable<Session> {
        const url = this.globalVariables.apiUrl + '/check_login';

        const params = {
            token: this.globalVariables.token
        };

        console.log('token:' + this.globalVariables.token);

        return this.http.post(url, params)
            .map((response: Response) => {
                return response.json() as Session;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(JSON.stringify(error.json()));
    }

    public checkLoginMonitore() {
        IntervalObservable.create(10000)
            .subscribe(() => {
                this.checkLoginObservable().subscribe(
                    data => {
                        console.log('CheckSession DATA', data);
                        this.globalVariables.userLogged = data.usuario_id != null;
                    },
                    error => {
                        console.log('CheckSession ERROR', error);
                    }
                );
            });
    }

    public logout() {
        this.appStorage.deleteLoginData();
        this.globalVariables.resetUserData();
    }
}
