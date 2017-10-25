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

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private loginForm: FormGroup;
    private loginCorrecto: boolean;
    private userId: number;

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

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private formBuilder: FormBuilder,
                private login: LoginProvider,
                private toast: ToastProvider) {

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

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave LoginPage');

        let onUserLogged = this.navParams.get('onUserLogged');

        onUserLogged({
            email: this.loginForm.get('userEmail').value,
            password: this.loginForm.get('userPassword').value,
            user_id: this.userId
        });
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

        this.login.checkLogin(email, password)
            .then((user_id) => {
                console.log('Login correcto', user_id);
                this.loginCorrecto = true;
                this.userId = user_id;
                this.navCtrl.pop();
                console.log('login poped');
            })
            .catch((error) => {
                console.log('Error', error);
                this.loginCorrecto = false;
            });
    }
}
