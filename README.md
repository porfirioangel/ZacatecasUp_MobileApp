# ZacatecasUp

Esta es la aplicación móvil de ZacatecasUp desarrollada con Ionic 3 y Angular 4.

## Instrucciones:

**Clonar proyecto:**
```
git clone https://gitlab.com/zacatecasup/ZacatecasUp_MobileApp.git
```

**Instalar dependencias manualmente:**
```
npm install
npm install @angular/animations@4.1.3 --save --save-exact
npm install ionic-tooltips --save
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
```

**Instalar dependencias automáticamente:**
```
npm install
ionic cordova prepare
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
