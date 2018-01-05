import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Comentario} from "../../models/comentario";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {LoginPage} from "../login/login";
import {NegocioProvider} from "../../providers/negocio/negocio";

@Component({
    selector: 'page-comentarios-negocio',
    templateUrl: 'comentarios-negocio.html',
})
export class ComentariosNegocioPage {
    private id_negocio: number;
    private comentarios: Comentario[];
    private host: string;
    private comment: string;

    constructor(private navCtrl: NavController,
                public navParams: NavParams,
                private globalVariables: GlobalVariablesProvider,
                private negocio: NegocioProvider) {

        this.comentarios = this.navParams.get('comentarios');
        this.id_negocio = this.navParams.get('id_negocio');
        this.host = this.globalVariables.hostNoPort;
    }

    openLoginPage() {
        this.navCtrl.push(LoginPage);
    }

    addComment(comment: string) {
        let id_usuario = this.globalVariables.id_usuario;
        let id_negocio = this.id_negocio;

        this.negocio.comentarNegocio(id_usuario, id_negocio, comment)
            .then((comentario) => {
                this.comentarios.push(comentario);
                this.comment = '';
            })
            .catch((error) => {
                console.log('Error al agregar comentario', error);
            })
    }
}
