import {Component, ElementRef} from '@angular/core';
import {
    ActionSheetController, AlertController, Loading, LoadingController,
    NavController,
    Platform, ToastController
} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {RegistroUsuarioProvider} from "../../providers/registro-usuario/registro-usuario";
import {Camera} from "@ionic-native/camera";
import {Crop} from "@ionic-native/crop";
import {
    FileTransfer, FileTransferObject,
    FileUploadResult
} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

declare var cordova: any;

@Component({
    selector: 'page-registrar',
    templateUrl: 'registrar.html',
})
export class RegistrarPage {
    private registerForm: FormGroup;
    private registerCorrecto: boolean;
    private birthday = '';
    lastImage: string = null;
    loading: Loading;

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
        ],
        'userGenre': [
            {
                type: 'required',
                message: 'El género es obligatorio'
            }
        ]
    };

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private elementRef: ElementRef,
                private register: RegistroUsuarioProvider,
                private actionSheetCtrl: ActionSheetController,
                private camera: Camera,
                private platform: Platform,
                private file: File,
                private crop: Crop,
                private transfer: FileTransfer,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                private globalVariables: GlobalVariablesProvider,
                private alertCtrl: AlertController) {

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
            'userGenre': new FormControl('M',
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
        usuario.sexo = this.registerForm.get('userGenre').value;
        usuario.email = this.registerForm.get('userEmail').value;
        usuario.password = this.registerForm.get('passwords').get('userPassword').value;
        usuario.tipo_usuario = 'UsuarioNormal';
        let fecha = this.registerForm.get('userBirthday').value;
        let parts = fecha.split('/');
        fecha = parts[2] + '-' + parts[1] + '-' + parts[0];
        usuario.fecha_nacimiento = fecha;

        this.register.registerUser(usuario)
            .then((usuario) => {
                return this.uploadImage(usuario.profile_photo);
            })
            .then((data) => {
                this.navCtrl.pop();
            })
            .catch((error) => {
                this.registerCorrecto = false;
            });
    }

    ////////////////////////////////////////////////////////////////////////////
    // Captura de imágenes
    ////////////////////////////////////////////////////////////////////////////

    public openImageActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Seleccionar imagen de perfil',
            buttons: [
                {
                    text: 'Desde galería',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Usar cámara',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    private getCorrectNames(fileUri: string) {
        let correctPath = '';
        let currentName = '';

        if (this.platform.is('ios')) {
            currentName = fileUri.substr(fileUri.lastIndexOf('/') + 1);

            correctPath = fileUri.substr(0,
                fileUri.lastIndexOf('/') + 1);
        } else if (this.platform.is('android')) {
            correctPath = fileUri.substr(0,
                fileUri.lastIndexOf('/') + 1);

            currentName = fileUri.substring(
                fileUri.lastIndexOf('/') + 1,
                fileUri.lastIndexOf('?'));
        }

        return {
            correctPath: correctPath,
            currentName: currentName
        };
    }

    public takePicture(sourceType) {
        console.log('takepicture', sourceType);

        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        this.camera.getPicture(options)
            .then((fileUri) => {
                // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
                // Only giving an android example as ionic-native camera has built in cropping ability
                if (this.platform.is('ios')) {
                    return {
                        fileUri: fileUri,
                        device: 'ios'
                    };
                } else if (this.platform.is('android')) {
                    return {
                        // Modify fileUri format, may not always be necessary
                        fileUri: 'file://' + fileUri,
                        device: 'android'
                    };
                }
            })
            .then((imageData) => {
                console.log('Image data', imageData);
                return this.cropImage(imageData.fileUri);
            })
            .then((croppedImageName) => {
                console.log('cropped', croppedImageName);

                let correctNames = this.getCorrectNames(croppedImageName);

                this.copyFileToLocalDir(correctNames.correctPath,
                    correctNames.currentName,
                    this.createFileName());
            })
            .catch((error) => {
                console.log('-- ERROR', error);
            });
    }

    // Create a new name for the image
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.file.copyFile(namePath, currentName, cordova.file.dataDirectory,
                newFileName)
                .then(success => {
                    this.lastImage = newFileName;
                    resolve(newFileName);
                }, error => {
                    this.presentToast('Error while storing file.');
                    reject('Error while storing file.');
                });
        });
    }

    private cropImage(imagePath): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.crop.crop(imagePath, {quality: 75})
                .then((newImage) => {
                    resolve(newImage);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    // public uploadImage(profile_photo: string) {
    //     // Destination URL
    //     var url = this.globalVariables.hostUrl + '/upload.php';
    //
    //     // File for Upload
    //     var targetPath = this.pathForImage(this.lastImage);
    //
    //     // File name only
    //     var filename = this.lastImage;
    //
    //     var options = {
    //         fileKey: "file",
    //         fileName: profile_photo,
    //         chunkedMode: false,
    //         mimeType: "multipart/form-data",
    //         params: {'fileName': filename}
    //     };
    //
    //     const fileTransfer: FileTransferObject = this.transfer.create();
    //
    //     this.loading = this.loadingCtrl.create({
    //         content: 'Uploading...',
    //     });
    //     this.loading.present();
    //
    //     // Use the FileTransfer to upload the image
    //     fileTransfer.upload(targetPath, url, options).then(data => {
    //         this.loading.dismissAll();
    //         this.presentToast('Image succesful uploaded.');
    //     }, err => {
    //         this.loading.dismissAll();
    //         this.presentToast('Error while uploading file.');
    //         this.presentAlert('ERROR', JSON.stringify(err));
    //     });
    // }

    public uploadImage(profile_photo: string) {
        // Destination URL
        var url = this.globalVariables.hostUrl + '/upload.php';

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;

        var options = {
            fileKey: "file",
            fileName: profile_photo,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {'fileName': filename}
        };

        const fileTransfer: FileTransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });

        this.loading.present();

        return new Promise<FileUploadResult>((resolve, reject) => {
            fileTransfer.upload(targetPath, url, options)
                .then((data) => {
                    this.loading.dismissAll();
                    this.presentToast('Image succesful uploaded.');
                    resolve(data);
                })
                .catch((error) => {
                    this.loading.dismissAll();
                    this.presentToast('Error while uploading file.');
                    reject(error);
                })
        });
    }

    presentAlert(title: string, text: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Dismiss']
        });
        alert.present();
    }
}
