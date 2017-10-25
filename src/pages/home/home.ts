import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {RecomendacionesPage} from "../recomendaciones/recomendaciones";
import {Categoria} from "../../models/categoria";
import {CategoriasProvider} from "../../providers/categorias/categorias";
import {AppStorageProvider} from "../../providers/app-storage/app-storage";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    categorias: Array<Categoria>;
    canSearch: boolean = false;
    searchQuery: string = '';

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public categoriasProvider: CategoriasProvider,
                private appStorage: AppStorageProvider) {
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

    searchByKeyword(keyword: string) {
        this.navCtrl.push(RecomendacionesPage, {
            searchQuery: this.searchQuery
        });
    }

    onInputSearch() {
        this.canSearch = this.searchQuery.length > 0;
    }

    clearData() {
        this.appStorage.deleteLoginData();
    }
}
