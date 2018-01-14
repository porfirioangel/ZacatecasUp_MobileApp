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
import {NegocioProvider} from '../providers/negocio/negocio';
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
import {GoHomeButton} from "../components/go-home-button/go-home-button";
import {RegistrarPage} from "../pages/registrar/registrar";
import {RegistroUsuarioProvider} from '../providers/registro-usuario/registro-usuario';

import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {Crop} from '@ionic-native/crop';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RecomendacionesPage,
        DetalleRecomendacionPage,
        ComentariosNegocioPage,
        RegistrarPage,
        LoginPage,
        IonRating,
        GoHomeButton,
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
        LoginPage,
        RegistrarPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        CategoriasProvider,
        GlobalVariablesProvider,
        NegocioProvider,
        Geolocation,
        ToastProvider,
        DevLocationProvider,
        AppStorageProvider,
        LoginProvider,
        RegistroUsuarioProvider,
        Camera,
        File,
        FileTransfer,
        FilePath,
        Crop
    ]
})
export class AppModule {
}
