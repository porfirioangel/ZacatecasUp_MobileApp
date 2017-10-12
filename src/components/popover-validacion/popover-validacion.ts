import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
    templateUrl: 'popover-validacion.html',
    selector: 'popover-validacion'
})
export class PopoverValidacion {
    mensajeError: string;

    constructor(public viewCtrl: ViewController) {
        this.mensajeError = this.viewCtrl.data.error_message;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
