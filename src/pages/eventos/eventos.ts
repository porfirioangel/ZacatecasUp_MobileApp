import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {EventoProvider} from "../../providers/evento/evento";
import {Evento} from "../../models/evento";
import {GlobalVariablesProvider} from "../../providers/global-variables/global-variables";
import {CategoriaEventoProvider} from "../../providers/categoria-evento/categoria-evento";

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
    selector: 'page-eventos',
    templateUrl: 'eventos.html',
})
export class EventosPage {
    private host: string;
    private eventos: Array<Evento>;
    private categorias: Array<string>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private eventoProvider: EventoProvider,
                private loadingCtrl: LoadingController,
                private globalVariables: GlobalVariablesProvider,
                private categoriasEvento: CategoriaEventoProvider) {
    }

    /**
     * Callback que se ejecuta cuando la vista se ha cargado
     */
    ionViewDidLoad() {
        this.host = this.globalVariables.hostUrl;
        this.loadEventos();
        this.loadCategorias();
    }

    /**
     * Consulta la lista de eventos
     */
    loadEventos() {
        let loader = this.loadingCtrl.create({
            content: 'Buscando eventos'
        });

        loader.present();

        this.eventoProvider.getEventos()
            .then(eventos => {
                this.eventos = eventos;
                loader.dismiss();
            })
            .catch(error => {
                loader.dismiss();
            });
    }

    /**
     * Consulta la lista de categorías
     */
    loadCategorias() {
        this.categoriasEvento.getCategorias()
            .then(categorias => {
                this.categorias = categorias;
            })
            .catch(error => {

            });
    }

}
