import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Comentario} from "../../models/comentario";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {LoginProvider} from "../../providers/login/login";
import {AppStorageProvider} from "../../providers/app-storage/app-storage";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-comentarios-negocio',
    templateUrl: 'comentarios-negocio.html',
})
export class ComentariosNegocioPage {
    private comentarios: Comentario[];
    private host: string;

    constructor(public navParams: NavParams,
                private globalVariables: GlobalVariablesProvider,
                private appStorage: AppStorageProvider) {

        this.comentarios = this.navParams.get('comentarios');
        this.host = this.globalVariables.hostNoPort;
    }

    /*openNewCommentModal() {
        let email = null;
        let password = null;

        let commentModal = this.modalCtrl.create(AddComentarioPage,
            {
                'comentarios': this.comentarios,
                'onCommentAdded': this.onCommentAdded
            });

        this.appStorage.getLoginEmail()
            .then((loginEmail) => {
                console.log('hay email guardado: ' + loginEmail);
                email = loginEmail;
                return this.appStorage.getLoginPassword()
            })
            .then((loginPasword) => {
                console.log('hay password guardado: ' + loginPasword);
                password = loginPasword;
                return this.login.loginWithCredentials(email, password);
            })
            .then((user_id) => {
                console.log('login correcto, user_id: ' + user_id);

                let commentModal = this.modalCtrl.create(AddComentarioPage,
                    {
                        'comentarios': this.comentarios,
                        'onCommentAdded': this.onCommentAdded
                    });

                commentModal.present();
            })
            .catch((error) => {
                console.log(error);

                this.navCtrl.push(LoginPage, {
                    'onUserLogged': this.onUserLogged
                });
            });
    }*/

    onCommentAdded = (params) => {
        return new Promise((resolve, reject) => {
            console.log('volví a ComentariosNegocioPage');
            console.log('Comentario', params.comentario);
            this.comentarios.push(params.comentario);
            resolve();
        });
    };
}
