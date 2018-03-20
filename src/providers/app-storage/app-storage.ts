import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class AppStorageProvider {

    constructor(private storage: Storage) {
        console.log('Hello AppStorageProvider Provider');
    }

    getLoginEmail(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.storage.get('email')
                .then((result) => {
                    if (result == null) {
                        reject('No hay email guardado');
                    } else {
                        resolve(result as string);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getLoginPassword() {
        return new Promise<string>((resolve, reject) => {
            this.storage.get('password')
                .then((result) => {
                    if (result == null) {
                        reject('No hay password guardada');
                    } else {
                        resolve(result as string);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getLoginTokenObserver() {
        return new Promise<string>((resolve, reject) => {
            this.storage.get('token')
                .then((result) => {
                    if (result == null) {
                        reject('No hay token guardado');
                    } else {
                        resolve(result as string);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getLoginToken() {
        return new Promise<string>((resolve, reject) => {
            this.storage.get('token')
                .then((result) => {
                    if (result == null) {
                        reject('No hay token guardado');
                    } else {
                        resolve(result as string);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    saveLoginData(token: string, email: string, password: string) {
        this.storage.set('email', email);
        this.storage.set('password', password);
        this.storage.set('token', token);
    }

    deleteLoginData() {
        this.storage.remove('email');
        this.storage.remove('password');
        this.storage.remove('token');
    }

}
