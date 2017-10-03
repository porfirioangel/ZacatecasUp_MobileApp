import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {Recomendacion} from "./recomendacion";

@Injectable()
export class RecomendacionesProvider {

    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
    }

    getRecomendaciones(busqueda: string): Promise<Recomendacion[]> {
        const url = this.globalVariables.host + '/buscar_recomendaciones';

        return new Promise<Recomendacion[]>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    resolve(response.json() as Recomendacion[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }
}
