import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from '@angular/fire/auth';
import { getAuth, TwitterAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  createEmailPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginEmailPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      signInWithPopup(this.auth, new GoogleAuthProvider())
        .then((userCredential) => {
          this.router.navigate(['/chat']);
          this.saveLocalStorage(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (proveedor === 'twitter') {
      signInWithPopup(this.auth, new TwitterAuthProvider())
        .then((userCredential) => {
          this.router.navigate(['/chat']);
          this.saveLocalStorage(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.removeLocalStorage();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  userAuth() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')!);
    }

    return null;
  }

  removeLocalStorage() {
    localStorage.removeItem('user');
  }
}
