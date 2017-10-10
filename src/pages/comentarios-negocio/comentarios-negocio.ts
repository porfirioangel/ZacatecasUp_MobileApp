import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Comentario} from "../../providers/recomendaciones/comentario";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

@Component({
    selector: 'page-comentarios-negocio',
    templateUrl: 'comentarios-negocio.html',
})
export class ComentariosNegocioPage {
    private comentarios: Comentario[];
    private host: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private globalVariables: GlobalVariablesProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ComentariosNegocioPage');
        this.comentarios = this.navParams.get('comentarios');
        this.host = this.globalVariables.hostNoPort;
    }

}
