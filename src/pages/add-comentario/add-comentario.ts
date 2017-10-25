import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Comentario} from "../../models/comentario";
import {PopoverValidacion} from "../../components/popover-validacion/popover-validacion";
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";

@Component({
    selector: 'page-add-comentario',
    templateUrl: 'add-comentario.html',
})
export class AddComentarioPage {
    private comentario: Comentario = new Comentario();

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public popoverCtrl: PopoverController,
                public recomendaciones: RecomendacionesProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddComentarioPage');
    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave AddComentarioPage');
        let onCommentAdded = this.navParams.get('onCommentAdded');
        onCommentAdded({'comentario': this.comentario});
    }

    addComentario() {
        console.log('addComentario()');

        if (this.comentario.comentario.length == 0) {
            this.showValidationError();
        } else {
            let id_usuario = 1;
            let id_negocio = 1;

            this.recomendaciones.comentarNegocio(id_usuario, id_negocio,
                this.comentario.comentario)
                .then((comentario) => {
                    console.log(comentario);
                    this.comentario = comentario;
                    this.navCtrl.pop();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    showValidationError() {
        let popover = this.popoverCtrl.create(PopoverValidacion,
            {
                error_message: 'El comentario no puede estar vacío'
            },
            {
                cssClass: 'error-popover'
            });

        popover.present();
    }

    cancel() {
        this.navCtrl.pop();
    }
}
