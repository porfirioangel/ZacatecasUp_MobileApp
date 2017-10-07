import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()
export class ToastProvider {

    constructor(private toastCtrl: ToastController) {
        console.log('Hello ToastProvider Provider');
    }

    showToast(message: string) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}
