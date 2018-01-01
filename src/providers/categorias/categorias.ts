import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {GlobalVariablesProvider} from "../global-variables/global-variables";

@Injectable()
export class CategoriasProvider {
    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
    }

    getCategorias(): Promise<string[]> {
        const url = this.globalVariables.host + '/obtener_categorias';

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
