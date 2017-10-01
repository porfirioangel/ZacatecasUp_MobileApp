import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AlertController} from 'ionic-angular';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CategoriasProvider} from "../providers/categorias/categorias";
import {Categoria} from "../providers/categorias/categoria";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any }>;

    categorias: Array<Categoria>;

    constructor(public platform: Platform, public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public alertCtrl: AlertController,
                public categoriasProvider: CategoriasProvider) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'List', component: ListPage}
        ];

        this.loadCategorias();
    }

    loadCategorias() {
        this.categoriasProvider.getCategorias()
            .then(categorias => {
                this.categorias = categorias;
            })
            .catch(error => {
                console.log('home', error);
            });
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
