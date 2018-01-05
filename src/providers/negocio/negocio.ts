import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {Recomendacion} from "../../models/recomendacion";
import {DetalleNegocio} from "../../models/detalle-negocio";
import {Calificacion} from "../../models/calificacion";
import {Comentario} from "../../models/comentario";


@Injectable()
export class NegocioProvider {

    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
    }

    getRecomendaciones(busqueda: string): Promise<Recomendacion[]> {
        const url = this.globalVariables.host + '/buscar_recomendaciones';

        console.log('busqueda', busqueda);

        const params = {
            params: {
                palabras_clave: busqueda
            }
        };

        return new Promise<Recomendacion[]>((resolve, reject) => {
            this.http.get(url, params)
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

        const params = {
            params: {
                id_negocio: id_negocio
            }
        };

        return new Promise<DetalleNegocio>((resolve, reject) => {
            this.http.get(url, params)
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
            id_usuario: id_usuario,
            id_negocio: id_negocio,
            calificacion: calificacion
        };

        return new Promise<Calificacion>((resolve, reject) => {
            this.http.post(url, params)
                .toPromise()
                .then((response) => {
                    console.log('POST request', response.url);
                    resolve(response.json() as Calificacion);
                })
                .catch((error) => {
                    console.log('POST request error', error);
                    reject(error.json());
                });
        });
    }

    comentarNegocio(id_usuario: number, id_negocio: number,
                    comentario: string): Promise<Comentario> {
        const url = this.globalVariables.host + '/agregar_comentario';

        const params = {
            id_usuario: id_usuario,
            id_negocio: id_negocio,
            comentario: comentario
        };

        console.log('comentario params', params);

        return new Promise<Comentario>((resolve, reject) => {
            this.http.post(url, params)
                .toPromise()
                .then((response) => {
                    console.log('POST request', response.url);
                    resolve(response.json() as Comentario);
                })
                .catch((error) => {
                    console.log('ERROR POST request', error);
                    reject(error.json());
                });
        })
    }

}
