import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariablesProvider} from "../global-variables/global-variables";

/*
  Generated class for the CategoriaEventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriaEventoProvider {
    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
    }

    getCategorias(): Promise<string[]> {
        const url = this.globalVariables.apiUrl + '/obtener_categorias_evento';

        return new Promise<string[]>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    resolve(response.json() as string[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }
}
