# ZacatecasUp

Esta es la aplicación móvil de ZacatecasUp desarrollada con Ionic 3 y Angular 4.

## Instrucciones:

**Clonar proyecto:**
```
git clone https://gitlab.com/zacatecasup/ZacatecasUp_MobileApp.git
```

**Instalar dependencias automáticamente:**
```
npm install
ionic cordova prepare
```

**Instalar dependencias manualmente:**
```
npm install
npm install @angular/animations@4.1.3 --save --save-exact
npm install ionic-tooltips --save
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
npm install --save @ionic-native/camera
npm install --save @ionic-native/file
npm install --save @ionic-native/file-path
npm install --save @ionic-native/file-transfer
npm install --save @ionic-native/crop
ionic cordova plugin add cordova-plugin-camera --save
ionic cordova plugin add cordova-plugin-file --save
ionic cordova plugin add cordova-plugin-file-transfer --save
ionic cordova plugin add cordova-plugin-filepath --save
ionic cordova plugin add cordova-plugin-crop
```

## iOS 11 Camera Permissions Plugin for Apache Cordova
```
cordova plugin add cordova-plugin-ios-camera-permissions --save
```

Customising the message prompts

On installation you can customise the prompts shown by setting the following variables on installation.

CAMERA_USAGE_DESCRIPTION for NSCameraUsageDescription
MICROPHONE_USAGE_DESCRIPTION for NSMicrophoneUsageDescription
PHOTOLIBRARY_ADD_USAGE_DESCRIPTION for NSPhotoLibraryAddUsageDescription (write-access only, iOS 11 only)
PHOTOLIBRARY_USAGE_DESCRIPTION for NSPhotoLibraryUsageDescription (read/write access)
For example:

```
cordova plugin add cordova-plugin-ios-camera-permissions --variable CAMERA_USAGE_DESCRIPTION="your usage message" --variable MICROPHONE_USAGE_DESCRIPTION="your microphone usage message here" --variable PHOTOLIBRARY_ADD_USAGE_DESCRIPTION="your photo library usage message here" --variable PHOTOLIBRARY_USAGE_DESCRIPTION="your photo library usage message here" --save
```

**Agregar plataformas:**
```
ionic cordova platform add android
ionic cordova platform add ios
```

**Ejecutar en el navegador**
```
ionic serve
```

**Ejecutar en android en modo de compilación JIT:**
```
ionic cordova run android
```

**Ejecutar en android en modo de compilación AOR:**
```
ionic cordova run android --prod
```

**Ejecutar en android con livereload y mensajes de consola:**
```
ionic cordova run android -lcs
```

## Solución de errores:
**Error: Failed to transpile program en ```@ionic-native/geolocation```:**
```
npm install @ionic-native/core --save
npm install @ionic-native/geolocation --save
ionic cordova plugin add cordova-plugin-geolocation
```

**No sirve el livereload:**
```
cordova plugin add cordova-plugin-whitelist --save
```
