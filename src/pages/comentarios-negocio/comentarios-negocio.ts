import {Component} from '@angular/core';
import {
    ActionSheetController,
    AlertController, ModalController, NavController,
    NavParams
} from 'ionic-angular';
import {Comentario} from "../../providers/recomendaciones/comentario";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {HomePage} from "../home/home";
import {AddComentarioPage} from "../add-comentario/add-comentario";

@Component({
    selector: 'page-comentarios-negocio',
    templateUrl: 'comentarios-negocio.html',
})
export class ComentariosNegocioPage {
    private comentarios: Comentario[];
    private host: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private globalVariables: GlobalVariablesProvider,
                public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ComentariosNegocioPage');
        this.comentarios = this.navParams.get('comentarios');
        this.host = this.globalVariables.hostNoPort;
    }

    presentModal() {
        let modal = this.modalCtrl.create(AddComentarioPage);
        modal.present();
    }
}
