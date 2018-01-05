import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecomendacionesPage} from "../recomendaciones/recomendaciones";
import {CategoriasProvider} from "../../providers/categorias/categorias";
import {LoginProvider} from "../../providers/login/login";
import {LoginPage} from "../login/login";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    categorias: Array<string>;
    canSearch: boolean = false;
    searchQuery: string = '';

    constructor(public navCtrl: NavController,
                public categoriasProvider: CategoriasProvider,
                public login: LoginProvider,
                private globalVariables: GlobalVariablesProvider) {
        this.login.loginWithSavedUser();
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
            searchQuery: keyword
        });
    }

    onInputSearch() {
        this.canSearch = this.searchQuery.length > 0;
    }

    openLoginPage() {
        this.navCtrl.push(LoginPage, {
            'onUserLogged': 'myCallbackFunction'
        });
    }
}
