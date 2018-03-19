import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {Recomendacion} from "../../models/recomendacion";
import {DetalleNegocio} from "../../models/detalle-negocio";
import {Calificacion} from "../../models/calificacion";
import {Comentario} from "../../models/comentario";
import {AppStorageProvider} from "../app-storage/app-storage";


@Injectable()
export class NegocioProvider {

    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider,
                private appStorage: AppStorageProvider) {
    }

    getRecomendaciones(busqueda: string): Promise<Recomendacion[]> {
        const url = this.globalVariables.apiUrl + '/buscar_recomendaciones';

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
        const url = this.globalVariables.apiUrl + '/detalles_negocio';

        console.log('id_negocio', id_negocio);

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

    calificarNegocio(usuario_id: number, negocio_id: number,
                     calificacion: number): Promise<Calificacion> {
        const url = this.globalVariables.apiUrl + '/calificar_negocio';

        const params = {
            usuario_id: usuario_id,
            negocio_id: negocio_id,
            calificacion: calificacion,
            token: ''
        };

        return this.appStorage.getLoginToken()
            .then((loginToken) => {
                params.token = loginToken;

                let addCalificacionPromise = new Promise<Calificacion>((resolve, reject) => {
                    this.http.post(url, params)
                        .toPromise()
                        .then((response) => {
                            console.log('POST request', response.url);
                            resolve(response.json() as Calificacion);
                        })
                        .catch((error) => {
                            console.log('POST request error', error);
                            console.log('params', params);
                            reject(error.json());
                        });
                });

                return addCalificacionPromise;
            });
    }

    comentarNegocio(id_usuario: number, id_negocio: number,
                    comentario: string): Promise<Comentario> {
        const url = this.globalVariables.apiUrl + '/agregar_comentario';

        const params = {
            usuario_id: id_usuario,
            negocio_id: id_negocio,
            comentario: comentario,
            token: ''
        };

        return this.appStorage.getLoginToken()
            .then((loginToken) => {
                params.token = loginToken;

                let addComentarioPromise = new Promise<Comentario>((resolve, reject) => {
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
                });

                return addComentarioPromise;
            });
    }

    getComentarios(negocioId: number, page: number): Promise<Comentario[]> {
        const url = this.globalVariables.apiUrl + '/obtener_comentarios';

        const params = {
            params: {
                negocio_id: negocioId,
            }
        };

        return new Promise<Comentario[]>((resolve, reject) => {
            this.http.get(url, params)
                .toPromise()
                .then((response) => {
                    console.log('GET request', response.url);
                    resolve(response.json() as Comentario[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }

    getPromocionesNegocios() {
        const url = this.globalVariables.apiUrl + '/obtener_promociones';

        return new Promise<Comentario[]>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    console.log('GET request', response.url);
                    resolve(response.json() as Comentario[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        });
    }

}
