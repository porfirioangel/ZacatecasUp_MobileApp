import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {RecomendacionesPage} from "../recomendaciones/recomendaciones";
import {Categoria} from "../../providers/categorias/categoria";
import {CategoriasProvider} from "../../providers/categorias/categorias";

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
                public categoriasProvider: CategoriasProvider) {
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
        this.navCtrl.setRoot(RecomendacionesPage);
    }

    onInputSearch() {
        this.canSearch = this.searchQuery.length > 0;
    }
}
