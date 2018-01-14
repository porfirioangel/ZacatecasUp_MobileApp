import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Usuario} from "../../models/usuario";
import {GlobalVariablesProvider} from "../global-variables/global-variables";

@Injectable()
export class RegistroUsuarioProvider {

    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
        console.log('Hello RegistroUsuarioProvider Provider');
    }

    public registerUser(usuario: Usuario): Promise<any> {
        const url = this.globalVariables.apiUrl + '/registrar_usuario';

        const params = {
            email: usuario.email,
            password: usuario.password,
            nombre: usuario.name,
            sexo: usuario.sexo,
            fecha_nacimiento: usuario.fecha_nacimiento,
            tipo_usuario: usuario.tipo_usuario,
        };

        return new Promise<any>((resolve, reject) => {
            this.http.post(url, params)
                .toPromise()
                .then((response) => {
                    console.log('POST request', response.url);
                    // this.globalVariables.userLogged = true;
                    // this.globalVariables.id_usuario = response.json().id_usuario;
                    resolve(response.json() as Usuario);
                })
                .catch((error) => {
                    console.log('POST request error', error);
                    // this.globalVariables.userLogged = false;
                    reject(error.json());
                });
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

}
