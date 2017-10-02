import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {RecomendacionesPage} from '../pages/recomendaciones/recomendaciones';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CategoriasProvider} from "../providers/categorias/categorias";
import {HttpModule} from "@angular/http";
import {GlobalVariablesProvider} from '../providers/global-variables/global-variables';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RecomendacionesPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RecomendacionesPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        CategoriasProvider,
        GlobalVariablesProvider,
    ]
})
export class AppModule {
}
