import {Component} from '@angular/core';
import {
    ActionSheetController,
    AlertController, ModalController, NavController,
    NavParams
} from 'ionic-angular';
import {Comentario} from "../../models/comentario";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {HomePage} from "../home/home";
import {AddComentarioPage} from "../add-comentario/add-comentario";
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

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private globalVariables: GlobalVariablesProvider,
                public modalCtrl: ModalController,
                private login: LoginProvider,
                private appStorage: AppStorageProvider) {

        this.comentarios = this.navParams.get('comentarios');
        this.host = this.globalVariables.hostNoPort;
    }

    returnToPageCallback = (params) => {
        return new Promise((resolve, reject) => {
            console.log('volví a ComentariosNegocioPage');
            this.comentarios.push(params.comentario);
            resolve();
        });
    };

    openNewCommentModal() {
        let email = null;
        let password = null;

        this.appStorage.getLoginEmail()
            .then((loginEmail) => {
                console.log('hay email guardado: ' + loginEmail);
                email = loginEmail;
                return this.appStorage.getLoginPassword()
            })
            .then((loginPasword) => {
                console.log('hay password guardado: ' + loginPasword);
                password = loginPasword;
                return this.login.checkLogin(email, password);
            })
            .then((user_id) => {
                console.log('login correcto, user_id: ' + user_id);

                let commentModal = this.modalCtrl.create(AddComentarioPage,
                    {
                        'comentarios': this.comentarios,
                        'returnCallback': this.returnToPageCallback
                    });

                commentModal.present();
            })
            .catch((error) => {
                console.log(error);
                this.navCtrl.push(LoginPage);
            });
    }
}
