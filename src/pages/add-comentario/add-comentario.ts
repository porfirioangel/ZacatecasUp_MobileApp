import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Comentario} from "../../models/comentario";
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'page-add-comentario',
    templateUrl: 'add-comentario.html',
})
export class AddComentarioPage {
    private comentarioForm: FormGroup;
    private comentario: Comentario;
    private comentarioCanceled: boolean;

    private valMessages = {
        'comentarioMessage': [
            {
                type: 'required',
                message: 'El comentario es obligatorio.'
            }
        ]
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public recomendaciones: RecomendacionesProvider,
                private formBuilder: FormBuilder) {

        this.comentarioForm = this.formBuilder.group({
            'comentarioMessage': new FormControl('Este',
                Validators.compose([
                    Validators.required
                ]))
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddComentarioPage');
    }

    ionViewWillLeave() {
        if (!this.comentarioCanceled) {
            console.log('ionViewWillLeave AddComentarioPage');

            let onCommentAdded = this.navParams.get('onCommentAdded');

            console.log('comentario', this.comentario);

            onCommentAdded({
                'comentario': this.comentario
            });
        }
    }

    addComentario() {
        console.log('addComentario()');

        let id_usuario = 1;
        let id_negocio = 1;

        this.recomendaciones.comentarNegocio(id_usuario, id_negocio,
            this.comentarioForm.get('comentarioMessage').value)
            .then((comentario) => {
                this.comentario = comentario;
                this.navCtrl.pop();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getComentarioErrors() {
        let fieldErrors = [];

        for (let validation of this.valMessages.comentarioMessage) {
            if (this.comentarioForm.get('comentarioMessage').hasError(validation.type) &&
                (this.comentarioForm.get('comentarioMessage').dirty ||
                    this.comentarioForm.get('comentarioMessage').touched)) {
                fieldErrors.push(validation);
            }
        }

        return fieldErrors;
    }

    cancel() {
        this.comentarioCanceled = true;
        this.navCtrl.pop();
    }
}
