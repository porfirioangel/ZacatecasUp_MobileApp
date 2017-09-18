import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AlertController} from 'ionic-angular';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any }>;
    categorias: Array<{ nombre: string, icono: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public alertCtrl: AlertController) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'List', component: ListPage}
        ];

        this.categorias = [
            {
                nombre: 'Comida',
                icono: 'restaurant'
            }, {
                nombre: 'Cafeterías',
                icono: 'cafe'
            }, {
                nombre: 'Bares',
                icono: 'beer'
            }, {
                nombre: 'Clubs Nocturnos',
                icono: 'wine'
            }, {
                nombre: 'Turismo',
                icono: 'map'
            }, {
                nombre: 'Servicios',
                icono: 'hammer'
            }
        ];
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
