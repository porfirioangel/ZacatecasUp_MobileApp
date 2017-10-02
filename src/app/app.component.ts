import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AlertController} from 'ionic-angular';

import {HomePage} from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    constructor(public platform: Platform, public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public alertCtrl: AlertController) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    showAlert(categoria) {
        let alert = this.alertCtrl.create({
            title: 'Categoría',
            message: categoria.nombre,
            buttons: ['OK']
        });
        alert.present();
    }
}
