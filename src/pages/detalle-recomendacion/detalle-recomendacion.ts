import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {NegocioProvider} from "../../providers/negocio/negocio";
import {DetalleNegocio} from "../../models/detalle-negocio";
import {ToastProvider} from "../../providers/toast/toast";
import {DevLocationProvider} from "../../providers/dev-location/dev-location";
import {ComentariosNegocioPage} from "../comentarios-negocio/comentarios-negocio";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-detalle-recomendacion',
    templateUrl: 'detalle-recomendacion.html',
})
export class DetalleRecomendacionPage {
    private id_negocio: number;
    private detalleNegocio: DetalleNegocio = new DetalleNegocio();
    private distancia: string = '';
    private descripcion: any = [];
    private host: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private recomendaciones: NegocioProvider,
                public toastProv: ToastProvider,
                private devLocation: DevLocationProvider,
                // private cdRef: ChangeDetectorRef,
                private globalVariables: GlobalVariablesProvider,
                private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.id_negocio = this.navParams.get('id_negocio');
        console.log('Cargar negocio', this.id_negocio);
        this.host = this.globalVariables.hostUrl;
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

    starClicked(starClicked) {
        if (this.globalVariables.userLogged) {
            this.recomendaciones.calificarNegocio(
                this.globalVariables.id_usuario,
                this.id_negocio, starClicked)
                .then((calificacion) => {
                    this.detalleNegocio.calificacion = calificacion.calificacion;
                    this.toastProv.showToast('La calificación fue agregada');
                })
                .catch(error => {
                    this.toastProv.showToast('La calificación no fue agregada');
                });
        } else {
            this.presentLoginNeededAlert();
        }
    }

    presentLoginNeededAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error al calificar',
            message: 'Es necesario iniciar sesión para poder calificar un' +
            ' negocio',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Iniciar sesión',
                    handler: () => {
                        this.navCtrl.push(LoginPage);
                    }
                }
            ]
        });
        alert.present();
    }

    viewComments() {
        this.navCtrl.push(ComentariosNegocioPage, {
            id_negocio: this.id_negocio,
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
