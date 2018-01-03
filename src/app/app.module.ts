import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {RecomendacionesPage} from '../pages/recomendaciones/recomendaciones';
import {DetalleRecomendacionPage} from '../pages/detalle-recomendacion/detalle-recomendacion';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CategoriasProvider} from "../providers/categorias/categorias";
import {HttpModule} from "@angular/http";
import {GlobalVariablesProvider} from '../providers/global-variables/global-variables';
import {RecomendacionesProvider} from '../providers/recomendaciones/recomendaciones';
import {IonRating} from '../components/ion-rating/ion-rating';
import {Geolocation} from '@ionic-native/geolocation';
import {ToastProvider} from '../providers/toast/toast';
import {DevLocationProvider} from '../providers/dev-location/dev-location';
import {ComentariosNegocioPage} from "../pages/comentarios-negocio/comentarios-negocio";
import {TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppStorageProvider} from '../providers/app-storage/app-storage';
import {LoginProvider} from '../providers/login/login';
import {LoginPage} from "../pages/login/login";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RecomendacionesPage,
        DetalleRecomendacionPage,
        ComentariosNegocioPage,
        IonRating,
        LoginPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        TooltipsModule,
        BrowserAnimationsModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RecomendacionesPage,
        DetalleRecomendacionPage,
        ComentariosNegocioPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        CategoriasProvider,
        GlobalVariablesProvider,
        RecomendacionesProvider,
        Geolocation,
        ToastProvider,
        DevLocationProvider,
        AppStorageProvider,
        LoginProvider,
    ]
})
export class AppModule {
}
