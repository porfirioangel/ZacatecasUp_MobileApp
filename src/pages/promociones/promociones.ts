import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, NavController,
    NavParams
} from 'ionic-angular';
import {NegocioProvider} from "../../providers/negocio/negocio";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
    selector: 'page-promociones',
    templateUrl: 'promociones.html',
})
export class PromocionesPage {
    private negociosPromos: any;
    private host: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private negocioProvider: NegocioProvider,
                private loadingCtrl: LoadingController,
                private globalVariables: GlobalVariablesProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PromocionesPage');
        this.host = this.globalVariables.hostUrl;
        this.loadPromocionesNegocios();
    }

    /**
     * Carga los negocios y sus promociones asociadas
     */
    loadPromocionesNegocios() {
        let loader = this.loadingCtrl.create({
            content: 'Buscando promociones'
        });

        loader.present();

        this.negocioProvider.getPromocionesNegocios()
            .then(promociones => {
                this.negociosPromos = promociones;
                console.log(promociones);
                loader.dismiss();
            })
            .catch(error => {
                loader.dismiss();
            });
    }

}
