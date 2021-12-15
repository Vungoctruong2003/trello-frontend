// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  firebaseConfig : {
    apiKey: "AIzaSyD0VoMkDyjMIEjvA1TsfJWp36qaW7U1-IY",
    authDomain: "trello-eb91c.firebaseapp.com",
    databaseURL: 'https://trello-eb91c-default-rtdb.firebaseio.com/',
    projectId: "trello-eb91c",
    storageBucket: "trello-eb91c.appspot.com",
    messagingSenderId: "549172270964",
    appId: "1:549172270964:web:2dbebb71a06c6df7c3be21",
    measurementId: "G-V2SKGSWVKB"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
