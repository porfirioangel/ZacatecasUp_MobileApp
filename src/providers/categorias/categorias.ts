import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {Categoria} from "./categoria";

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {
    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
    }

    getCategorias(): Promise<Categoria[]> {
        const url = this.globalVariables.host + '/obtener_categorias';

        return new Promise<Categoria[]>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    resolve(response.json() as Categoria[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }
}
