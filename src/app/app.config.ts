import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBhOfcw7-3k1whS1MORftPxQw2tyPskKsI',
        authDomain: 'firechat-d7863.firebaseapp.com',
        databaseURL: 'https://firechat-d7863-default-rtdb.firebaseio.com',
        projectId: 'firechat-d7863',
        storageBucket: 'firechat-d7863.appspot.com',
        messagingSenderId: '450909003432',
        appId: '1:450909003432:web:09cd0b05758775b613ec9d',
        measurementId: 'G-HZ2H9SN5GL',
      })
    ),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    GoogleAuthProvider,
    TwitterAuthProvider,
  ],
};
