import {Component, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {RegistroUsuarioProvider} from "../../providers/registro-usuario/registro-usuario";

@Component({
    selector: 'page-registrar',
    templateUrl: 'registrar.html',
})
export class RegistrarPage {
    private registerForm: FormGroup;
    private registerCorrecto: boolean;
    private birthday = '';

    private valMessages = {
        'userName': [
            {
                type: 'required',
                message: 'El nombre es obligatorio.'
            }
        ],
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
        'userBirthday': [
            {
                type: 'required',
                message: 'La fecha de nacimiento es obligatoria.'
            }
        ],
        'userPassword': [
            {
                type: 'required',
                message: 'La contraseña es obligatoria.'
            }
        ],
        'userRePassword': [
            {
                type: 'required',
                message: 'La confirmación de contraseña es obligatoria.'
            }
        ],
        'passwords': [
            {
                type: 'areEqual',
                message: 'Las contraseñas no son iguales.'
            }
        ]
    };

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private elementRef: ElementRef,
                private register: RegistroUsuarioProvider) {

        this.initRegisterForm();
        this.registerCorrecto = true;
    }

    /**
     * Inicializa el formulario de registro.
     */
    initRegisterForm() {
        this.registerForm = this.formBuilder.group({
            'userName': new FormControl('Porfirio Ángel Díaz Sánchez',
                Validators.compose([
                    Validators.required
                ])),
            'userEmail': new FormControl('porfirioads@gmail.com',
                Validators.compose([
                    Validators.required,
                ])),
            'userBirthday': new FormControl('20/07/1996',
                Validators.compose([
                    Validators.required,
                ])),
            'passwords': this.formBuilder.group({
                userPassword: ['holamundo', Validators.required],
                userRePassword: ['holamundo', Validators.required]
            }, {validator: this.areEqual})
        });
    }

    getNameErrors() {
        return this.getFieldErrors(this.valMessages.userName, 'userName');
    }

    getEmailErrors() {
        return this.getFieldErrors(this.valMessages.userEmail, 'userEmail');
    }

    getBirthdayErrors() {
        return this.getFieldErrors(this.valMessages.userBirthday, 'userBirthday');
    }

    getPasswordErrors() {
        return this.getFieldErrors(this.valMessages.userPassword, 'userPassword');
    }

    getRePasswordErrors() {
        let userRePasswordErrors = this.getFieldErrors(
            this.valMessages.userRePassword, 'userRePassword');
        let passwordsErrors = this.getFieldErrors(
            this.valMessages.passwords, 'passwords');

        return userRePasswordErrors.concat(passwordsErrors);
    }

    /**
     * Obtiene los mensajes de error de un campo del formulario.
     */
    getFieldErrors(fieldValMessages: any[], fieldName: string) {
        let fieldErrors = [];
        let formGroup = null;

        if (fieldName === 'userPassword' || fieldName === 'userRePassword') {
            formGroup = this.registerForm.get('passwords');
        } else {
            formGroup = this.registerForm;
        }

        for (let validation of fieldValMessages) {
            if (formGroup.get(fieldName).hasError(validation.type) &&
                (formGroup.get(fieldName).dirty ||
                    formGroup.get(fieldName).touched)) {
                fieldErrors.push(validation);
            }
        }

        return fieldErrors;
    }

    /**
     * Valida que la contraseña y confirmación sean iguales.
     */
    areEqual(group: FormGroup) {
        let userPassword = group.get('userPassword').value;
        let userRePassword = group.get('userRePassword').value;

        if (userPassword === userRePassword) {
            return null;
        } else {
            return {
                areEqual: true
            }
        }
    }

    /**
     * Simula el click en el ion-datetime para que se despliegue el calendario.
     */
    clickDatePicker() {
        let datePicker = this.elementRef.nativeElement.querySelector('#datePicker');
        datePicker.dispatchEvent(new Event('click'));
    }

    /**
     * Actualiza la fecha del textbox del formulario al seleccionar una en
     * el ion-datetime.
     */
    changeDate() {
        let parts = this.birthday.split('-');
        let formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];
        this.registerForm.get('userBirthday').setValue(formattedDate);
    }

    /**
     * Registra al usuario con los datos del formulario.
     */
    registerUser() {
        let usuario = new Usuario();
        usuario.name = this.registerForm.get('userName').value;
        usuario.email = this.registerForm.get('userEmail').value;
        usuario.password = this.registerForm.get('passwords').get('userPassword').value;
        usuario.tipo_usuario = 'UsuarioNormal';
        // TODO Agregar sexo al form
        usuario.sexo = 'H';
        let fecha = this.registerForm.get('userBirthday').value;
        let parts = fecha.split('/');
        fecha = parts[2] + '-' + parts[1] + '-' + parts[0];
        usuario.fecha_nacimiento = fecha;

        this.register.registerUser(usuario)
            .then((response) => {
                console.log('usuario registrado');
                this.navCtrl.pop();
            })
            .catch((error) => {
                this.registerCorrecto = false;
            });
    }
}
