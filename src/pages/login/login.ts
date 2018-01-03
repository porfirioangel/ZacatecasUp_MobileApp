import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl, FormControl
} from '@angular/forms';
import {LoginProvider} from "../../providers/login/login";
import {ToastProvider} from "../../providers/toast/toast";
import {Usuario} from "../../models/usuario";
import {AppStorageProvider} from "../../providers/app-storage/app-storage";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private loginForm: FormGroup;
    private loginCorrecto: boolean;

    private valMessages = {
        'userEmail': [
            {
                type: 'required',
                message: 'El email es obligatorio.'
            },
            {
                type: 'email',
                message: 'El texto ingresado no es un email.'
            }
        ],
        'userPassword': [
            {
                type: 'required',
                message: 'La contraseña es obligatoria'
            }
        ]
    };

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private login: LoginProvider,
                private appStorage: AppStorageProvider,
                private globalVariables: GlobalVariablesProvider) {

        this.loginForm = this.formBuilder.group({
            'userEmail': new FormControl('porfirioads@gmail.com',
                Validators.compose([
                    Validators.required,
                    Validators.email
                ])),
            'userPassword': new FormControl('holamundo',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ]))
        });

        this.loginCorrecto = true;
    }

    getEmailErrors() {
        return this.getFieldErrors(this.valMessages.userEmail, 'userEmail');
    }

    getPasswordErrors() {
        return this.getFieldErrors(this.valMessages.userPassword, 'userPassword');
    }

    getFieldErrors(fieldValMessages: any[], fieldName: string) {
        let fieldErrors = [];

        for (let validation of fieldValMessages) {
            if (this.loginForm.get(fieldName).hasError(validation.type) &&
                (this.loginForm.get(fieldName).dirty ||
                    this.loginForm.get(fieldName).touched)) {
                fieldErrors.push(validation);
            }
        }

        return fieldErrors;
    }

    doLogin() {
        let email = this.loginForm.get('userEmail').value;
        let password = this.loginForm.get('userPassword').value;

        this.login.loginWithCredentials(email, password)
            .then((usuario) => {
                this.loginCorrecto = true;
                this.saveLoginCredentials(usuario.id_usuario, email, password);
                this.navCtrl.pop();
            })
            .catch((error) => {
                this.loginCorrecto = false;
            });
    }

    private saveLoginCredentials(id_usuario: number, email: string,
                                 password: string) {
        this.appStorage.saveLoginData(email, password);
        this.globalVariables.email = email;
        this.globalVariables.password = password;
        this.globalVariables.id_usuario = id_usuario;
    }
}
