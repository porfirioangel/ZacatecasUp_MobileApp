import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {Position} from "../../models/position";

@Injectable()
export class DevLocationProvider {

    constructor(public geolocation: Geolocation) {
        console.log('Hello DevLocationProvider Provider');
    }

    getLocation(): Promise<Position> {
        return new Promise<Position>((resolve, reject) => {
            this.geolocation.getCurrentPosition()
                .then((resp) => {
                    let position = new Position(resp.coords.latitude,
                        resp.coords.longitude);
                    resolve(position as Position);
                }).catch((error) => {
                console.log('Error getting location', error);
            });
        });
    }

    getDistanceFromHere(latitud: number, longitud: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.getLocation()
                .then((location) => {
                    let distance = this.getDistanceBetweenLocations(
                        location.latitude, location.longitude,
                        latitud, longitud);
                    resolve(distance);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    getDistanceBetweenLocations(latitud1: number, longitud1: number,
                                latitud2: number, longitud2: number) {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((latitud1 - latitud2) * p) / 2 + c(latitud2 * p) *
            c((latitud1) * p) * (1 - c(((longitud1 - longitud2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a)));
        let kmDistance = parseFloat(dis.toFixed(2));

        if (kmDistance < 0.5) {
            return (kmDistance * 1000) + ' m';
        } else {
            return kmDistance + ' km';
        }
    }

}
