import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {Recomendacion} from "./recomendacion";
import {DetalleNegocio} from "./detalle-negocio";
import {Calificacion} from "./calificacion";

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
                    console.log('GET request', response.url);
                    resolve(response.json() as Recomendacion[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }

    getDetalleNegocio(id_negocio: number): Promise<DetalleNegocio> {
        const url = this.globalVariables.host + '/detalles_negocio';

        return new Promise<DetalleNegocio>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    console.log('GET request', response.url);
                    resolve(response.json() as DetalleNegocio);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }

    calificarNegocio(id_usuario: number, id_negocio: number,
                     calificacion: number): Promise<Calificacion> {
        const url = this.globalVariables.host + '/calificar_negocio';

        const params = {
            params: {
                id_usuario: id_usuario,
                id_negocio: id_negocio,
                calificacion: calificacion
            }
        };

        return new Promise<Calificacion>((resolve, reject) => {
            this.http.get(url, params)
                .toPromise()
                .then((response) => {
                    console.log('GET request', response.url);
                    resolve(response.json() as Calificacion);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }

}
