import {Component} from '@angular/core';
import {
    IonicPage, NavController, NavParams,
    PopoverController
} from 'ionic-angular';
import {Comentario} from "../../providers/recomendaciones/comentario";
import {PopoverValidacion} from "../../components/popover-validacion/popover-validacion";

@Component({
    selector: 'page-add-comentario',
    templateUrl: 'add-comentario.html',
})
export class AddComentarioPage {
    private comentario: Comentario = new Comentario();

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public popoverCtrl: PopoverController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddComentarioPage');
    }

    addComentario() {
        console.log('addComentario()');

        if(this.comentario.comentario.length == 0) {
            let popover = this.popoverCtrl.create(PopoverValidacion,
                {
                    error_message: 'El comentario no puede estar vacío'
                },
                {
                    cssClass: 'error-popover'
                });

            popover.present();
        }
    }

    cancel() {
        this.navCtrl.pop();
    }
}
