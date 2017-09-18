import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    canSearch: boolean = false;
    searchQuery: string = '';
    items: string[];

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController) {
    }

    searchByKeyword(keyword: string) {
        this.showAlert(keyword)
    }

    showAlert(keyword) {
        let alert = this.alertCtrl.create({
            title: 'Búsqueda',
            message: 'Se buscará ' + keyword,
            buttons: ['OK']
        });
        alert.present();
    }

    onInputSearch() {
        this.canSearch = this.searchQuery.length > 0;
    }
}
