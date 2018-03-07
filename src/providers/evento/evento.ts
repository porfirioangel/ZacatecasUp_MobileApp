import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariablesProvider} from "../global-variables/global-variables";
import {Evento} from "../../models/evento";

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoProvider {

    constructor(public http: Http,
                private globalVariables: GlobalVariablesProvider) {
    }

    getEventos(): Promise<Evento[]> {
        const url = this.globalVariables.apiUrl + '/obtener_eventos';

        return new Promise<Evento[]>((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then((response) => {
                    console.log('GET request', response.url);
                    resolve(response.json() as Evento[]);
                })
                .catch((error) => {
                    reject(error.json());
                });
        })
    }
}
