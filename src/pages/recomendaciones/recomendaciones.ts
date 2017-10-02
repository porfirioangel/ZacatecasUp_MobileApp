import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, NavController,
    NavParams
} from 'ionic-angular';
import {HomePage} from "../home/home";


@IonicPage()
@Component({
    selector: 'page-recomendaciones',
    templateUrl: 'recomendaciones.html',
})
export class RecomendacionesPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public loadingCtrl: LoadingController) {
        this.presentLoading();
    }

    goBack() {
        this.navCtrl.setRoot(HomePage);
    }

    presentLoading() {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
    }

}
