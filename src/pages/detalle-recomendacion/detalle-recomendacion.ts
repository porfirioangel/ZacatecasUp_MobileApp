import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RecomendacionesPage} from "../recomendaciones/recomendaciones";
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";
import {DetalleNegocio} from "../../providers/recomendaciones/detalle-negocio";

@Component({
    selector: 'page-detalle-recomendacion',
    templateUrl: 'detalle-recomendacion.html',
})
export class DetalleRecomendacionPage {
    private id_negocio: number;
    private detalleNegocio: DetalleNegocio = new DetalleNegocio();

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private recomendaciones: RecomendacionesProvider) {
    }

    ionViewDidLoad() {
        this.id_negocio = this.navParams.get('id_negocio');
        console.log('Cargar negocio', this.id_negocio);
        this.getDetalleRecomendacion();
    }

    getDetalleRecomendacion() {
        this.recomendaciones.getDetalleNegocio(this.id_negocio)
            .then(detalleNegocio => {
                this.detalleNegocio = detalleNegocio;
            })
            .catch(error => {
                console.log('detalle-recomendacion', error);
            });
    }
}
