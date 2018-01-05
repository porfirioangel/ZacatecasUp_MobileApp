import {Component} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
    selector: '[go-home-button]',
    templateUrl: 'go-home-button.html'
})
export class GoHomeButton {
    constructor(private navCtrl: NavController) {
        console.log('Hello GoHomeButton Component');
    }

    goHome() {
        this.navCtrl.popToRoot();
    }
}
