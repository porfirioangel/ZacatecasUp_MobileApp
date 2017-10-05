import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RecomendacionesPage} from "../recomendaciones/recomendaciones";

@Component({
    selector: 'page-detalle-recomendacion',
    templateUrl: 'detalle-recomendacion.html',
})
export class DetalleRecomendacionPage {
    private id_negocio: number;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.id_negocio = this.navParams.get('id_negocio');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetalleRecomendacionPage');
    }

    goBack() {
        this.navCtrl.setRoot(RecomendacionesPage, {
            searchQuery: this.navParams.get('searchQuery')
        });
    }

}
