import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Recomendacion} from "../../models/recomendacion";
import {NegocioProvider} from "../../providers/negocio/negocio";
import {DetalleRecomendacionPage} from "../detalle-recomendacion/detalle-recomendacion";
import {DevLocationProvider} from "../../providers/dev-location/dev-location";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

@Component({
    selector: 'page-recomendaciones',
    templateUrl: 'recomendaciones.html',
})
export class RecomendacionesPage {
    private host: string;
    private recomendaciones: Array<Recomendacion>;
    private searchQuery: string;
    private distancias: Map<Recomendacion, string> = new Map();

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public recomendacionesProvider: NegocioProvider,
                // private cdRef: ChangeDetectorRef,
                private devLocation: DevLocationProvider,
                private globalVariables: GlobalVariablesProvider) {
    }

    ionViewDidLoad() {
        this.searchQuery = this.navParams.get('searchQuery');
        this.host = this.globalVariables.hostUrl;
        this.loadRecomendaciones();
    }

    loadDistances() {
        for (let recomendacion of this.recomendaciones) {
            this.devLocation.getDistanceFromHere(recomendacion.latitud,
                recomendacion.longitud)
                .then((distance) => {
                    this.distancias.set(recomendacion, distance);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    loadRecomendaciones() {
        let loader = this.loadingCtrl.create({
            content: 'Buscando recomendaciones'
        });

        loader.present();

        this.recomendacionesProvider.getRecomendaciones(this.searchQuery)
            .then(recomendaciones => {
                this.recomendaciones = recomendaciones;
                console.log('rec', this.recomendaciones);
                this.loadDistances();
                loader.dismiss();
            })
            .catch(error => {
                console.log('home', error);
                loader.dismiss();
            });
    }

    openRecomendacion(recomendacion: Recomendacion) {
        this.navCtrl.push(DetalleRecomendacionPage, {
            id_negocio: recomendacion.id_negocio,
            searchQuery: this.searchQuery
        });
    }

    // /**
    //  * Evita el error "ExpressionChangedAfterItHasBeenCheckedError" del
    //  * componente ion-rating
    //  */
    // ngAfterViewChecked() {
    //     this.cdRef.detectChanges();
    // }

}
