import {Component} from '@angular/core';
import {Keyboard, NavController, Platform} from 'ionic-angular';
import {RecomendacionesPage} from "../recomendaciones/recomendaciones";
import {CategoriasProvider} from "../../providers/categorias/categorias";
import {LoginProvider} from "../../providers/login/login";
import {LoginPage} from "../login/login";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {EventosPage} from "../eventos/eventos";
import {PromocionesPage} from "../promociones/promociones";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    categorias: Array<string>;
    canSearch: boolean = false;
    searchQuery: string = '';
    height: number;

    constructor(public navCtrl: NavController,
                public categoriasProvider: CategoriasProvider,
                public login: LoginProvider,
                private globalVariables: GlobalVariablesProvider,
                public keyboard: Keyboard,
                private platform: Platform,
                private screenOrientation: ScreenOrientation) {
        this.login.loginWithSavedUser();
        this.loadCategorias();
        this.listenScreenOrientationChanges();
    }

    /**
     * Se queda a la escucha de los cambios en la orientación de la pantalla
     * para actualizar las dimensiones de la imagen de fondo
     */
    listenScreenOrientationChanges() {
        this.updateBackgroundHeight();

        // detect orientation changes
        this.screenOrientation.onChange().subscribe(
            () => {
                console.log(this.screenOrientation.type);
                this.updateBackgroundHeight();
                console.log('new height: ' + this.height);
            }
        );
    }

    /**
     * Actualiza la altura de la imagen de fondo dependiendo al tipo de
     * orientación del dispositivo
     */
    updateBackgroundHeight() {
        let mayor = this.platform.height();
        let menor = this.platform.width();

        if (mayor < menor) {
            let aux = menor;
            menor = mayor;
            mayor = aux;
        }

        if (this.screenOrientation.type.indexOf('landscape') >= 0) {
            this.height = menor;
        } else {
            this.height = mayor;
        }
    }

    /**
     * Carga las categorías que aparecen el el menú
     */
    loadCategorias() {
        this.categoriasProvider.getCategorias()
            .then(categorias => {
                this.categorias = categorias;
            })
            .catch(error => {
                console.log('home', error);
            });
    }

    /**
     * Manda buscar recomendaciones a partir de las palabras clave
     */
    searchByKeyword(keyword: string) {
        this.navCtrl.push(RecomendacionesPage, {
            searchQuery: keyword
        });
    }

    /**
     * Callback ejecutado al modificar el texto de búsqueda
     */
    onInputSearch() {
        this.canSearch = this.searchQuery.length > 0;
    }

    /**
     * Abre la página de login
     */
    openLoginPage() {
        this.navCtrl.push(LoginPage, {
            'onUserLogged': 'myCallbackFunction'
        });
    }

    /**
     * Abre la página de eventos
     */
    openEventosPage() {
        this.navCtrl.push(EventosPage);
    }

    /**
     * Abre la página de promociones
     */
    openPromocionesPage() {
        this.navCtrl.push(PromocionesPage);
    }
}
