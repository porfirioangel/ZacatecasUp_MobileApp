import {ChangeDetectorRef, Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Recomendacion} from "../../providers/recomendaciones/recomendacion";
import {RecomendacionesProvider} from "../../providers/recomendaciones/recomendaciones";
import {DetalleRecomendacionPage} from "../detalle-recomendacion/detalle-recomendacion";

@Component({
    selector: 'page-recomendaciones',
    templateUrl: 'recomendaciones.html',
})
export class RecomendacionesPage {
    private recomendaciones: Array<Recomendacion>;
    private searchQuery: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public recomendacionesProvider: RecomendacionesProvider,
                private cdRef: ChangeDetectorRef) {
        this.searchQuery = this.navParams.get('searchQuery');
        this.loadRecomendaciones();
    }

    goBack() {
        this.navCtrl.setRoot(HomePage);
    }

    loadRecomendaciones() {
        let loader = this.loadingCtrl.create({
            content: 'Buscando recomendaciones'
        });

        loader.present();

        this.recomendacionesProvider.getRecomendaciones(this.searchQuery)
            .then(recomendaciones => {
                this.recomendaciones = recomendaciones;
                loader.dismiss();
            })
            .catch(error => {
                console.log('home', error);
                loader.dismiss();
            });
    }

    openRecomendacion(recomendacion: Recomendacion) {
        this.navCtrl.setRoot(DetalleRecomendacionPage, {
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
}
