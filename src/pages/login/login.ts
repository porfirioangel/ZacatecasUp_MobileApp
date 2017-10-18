import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl, FormControl
} from '@angular/forms';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
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
            },
            // {
            //     type: 'minlength',
            //     message: 'La contraseña debe contener mínimo 6 caracteres'
            // }
        ]
    };

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            'userEmail': new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ])),
            'userPassword': new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ]))
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    private loginForm: FormGroup;

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

    logForm() {
        console.log(this.loginForm.value)
    }
}
