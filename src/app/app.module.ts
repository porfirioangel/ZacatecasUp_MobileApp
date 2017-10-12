import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

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
import {AddComentarioPage} from "../pages/add-comentario/add-comentario";
import {TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PopoverValidacion} from "../components/popover-validacion/popover-validacion";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RecomendacionesPage,
        DetalleRecomendacionPage,
        ComentariosNegocioPage,
        AddComentarioPage,
        IonRating,
        PopoverValidacion
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        TooltipsModule,
        BrowserAnimationsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RecomendacionesPage,
        DetalleRecomendacionPage,
        ComentariosNegocioPage,
        AddComentarioPage,
        PopoverValidacion
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
    ]
})
export class AppModule {
}
