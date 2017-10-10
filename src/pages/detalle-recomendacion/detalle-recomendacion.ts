import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";
import {DetalleNegocio} from "../../providers/recomendaciones/detalle-negocio";
import {ToastProvider} from "../../providers/toast/toast";
import {DevLocationProvider} from "../../providers/dev-location/dev-location";
import {ComentariosNegocioPage} from "../comentarios-negocio/comentarios-negocio";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

@Component({
    selector: 'page-detalle-recomendacion',
    templateUrl: 'detalle-recomendacion.html',
})
export class DetalleRecomendacionPage {
    private id_negocio: number;
    private detalleNegocio: DetalleNegocio = new DetalleNegocio();
    private distancia: string = '';
    private descripcionKeys: string[];
    private descripcion: any = [];
    private host: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private recomendaciones: RecomendacionesProvider,
                public toastProv: ToastProvider,
                private devLocation: DevLocationProvider,
                private cdRef: ChangeDetectorRef,
                private globalVariables: GlobalVariablesProvider) {
    }

    ionViewDidLoad() {
        this.id_negocio = this.navParams.get('id_negocio');
        console.log('Cargar negocio', this.id_negocio);
        this.host = this.globalVariables.hostNoPort;
        this.getDetalleRecomendacion();
    }

    getDetalleRecomendacion() {
        this.recomendaciones.getDetalleNegocio(this.id_negocio)
            .then(detalleNegocio => {
                this.detalleNegocio = detalleNegocio;
                this.loadDescripcion();
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

    loadDescripcion() {
        let keys = Object.keys(this.detalleNegocio.descripcion_completa);

        for (let key of keys) {
            this.descripcion.push(this.detalleNegocio.descripcion_completa[key]);
        }
    }

    starClicked() {
        this.recomendaciones.calificarNegocio(1, this.id_negocio,
            this.detalleNegocio.calificacion)
            .then((calificacion) => {
                this.detalleNegocio.calificacion = calificacion.calificacion;
                this.toastProv.showToast('Se agregó calificación');
            })
            .catch(error => {
                this.toastProv.showToast('No se agregó calificación');
            });
    }

    viewComments() {
        this.navCtrl.push(ComentariosNegocioPage, {
            comentarios: this.detalleNegocio.comentarios
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
