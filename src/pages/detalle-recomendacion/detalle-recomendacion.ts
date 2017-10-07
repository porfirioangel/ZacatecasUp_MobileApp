import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";
import {DetalleNegocio} from "../../providers/recomendaciones/detalle-negocio";
import {ToastProvider} from "../../providers/toast/toast";
import {DevLocationProvider} from "../../providers/dev-location/dev-location";

@Component({
    selector: 'page-detalle-recomendacion',
    templateUrl: 'detalle-recomendacion.html',
})
export class DetalleRecomendacionPage {
    private id_negocio: number;
    private detalleNegocio: DetalleNegocio = new DetalleNegocio();
    private distancia: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private recomendaciones: RecomendacionesProvider,
                public toastProv: ToastProvider,
                private devLocation: DevLocationProvider,
                private cdRef: ChangeDetectorRef) {
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

                return this.devLocation.getDistanceFromHere(
                    detalleNegocio.latitud, detalleNegocio.longitud);
            })
            .then((distance) => {
                this.distancia = distance;
            })
            .catch(error => {
                console.log('detalle-recomendacion', error);
            });
    }

    starClicked() {
        this.toastProv.showToast('Se agregó calificación');
    }

    // /**
    //  * Evita el error "ExpressionChangedAfterItHasBeenCheckedError" del
    //  * componente ion-rating
    //  */
    // ngAfterViewChecked() {
    //     this.cdRef.detectChanges();
    // }

}
