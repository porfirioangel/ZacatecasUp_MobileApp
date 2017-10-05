import {ChangeDetectorRef, Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Recomendacion} from "../../providers/recomendaciones/recomendacion";
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";
import {DetalleRecomendacionPage} from "../detalle-recomendacion/detalle-recomendacion";
import {Geolocation} from '@ionic-native/geolocation';

@Component({
    selector: 'page-recomendaciones',
    templateUrl: 'recomendaciones.html',
})
export class RecomendacionesPage {
    private recomendaciones: Array<Recomendacion>;
    private searchQuery: string;
    private distancias: Map<Recomendacion, string> = new Map();

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public recomendacionesProvider: RecomendacionesProvider,
                private cdRef: ChangeDetectorRef,
                private geolocation: Geolocation) {
        this.searchQuery = this.navParams.get('searchQuery');
        this.loadRecomendaciones();
    }

    loadRecomendaciones() {
        let loader = this.loadingCtrl.create({
            content: 'Buscando recomendaciones'
        });

        loader.present();

        this.recomendacionesProvider.getRecomendaciones(this.searchQuery)
            .then(recomendaciones => {
                this.recomendaciones = recomendaciones;
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

    /**
     * Evita el error "ExpressionChangedAfterItHasBeenCheckedError" del
     * componente ion-rating
     */
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    loadDistances() {
        this.geolocation.getCurrentPosition().then((resp) => {
            for (let recomendacion of this.recomendaciones) {
                this.distancias.set(recomendacion,
                    this.calculateDistance(resp.coords.latitude,
                        recomendacion.latitud,
                        resp.coords.longitude,
                        recomendacion.longitud));
            }
            resp.coords;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) *
            c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a)));
        let kmDistance = parseFloat(dis.toFixed(2));

        if(kmDistance < 0.5) {
            return (kmDistance * 1000) + ' m';
        } else {
            return kmDistance + ' km';
        }
    }

}
