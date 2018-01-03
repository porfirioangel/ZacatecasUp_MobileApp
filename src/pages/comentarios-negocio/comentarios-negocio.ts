import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Comentario} from "../../models/comentario";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

@Component({
    selector: 'page-comentarios-negocio',
    templateUrl: 'comentarios-negocio.html',
})
export class ComentariosNegocioPage {
    private comentarios: Comentario[];
    private host: string;

    constructor(public navParams: NavParams,
                private globalVariables: GlobalVariablesProvider) {

        this.comentarios = this.navParams.get('comentarios');
        this.host = this.globalVariables.hostNoPort;
    }

    onCommentAdded = (params) => {
        return new Promise((resolve, reject) => {
            console.log('volví a ComentariosNegocioPage');
            console.log('Comentario', params.comentario);
            this.comentarios.push(params.comentario);
            resolve();
        });
    };
}
