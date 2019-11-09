import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})

export class AuthService {
    token: any;

    constructor(private http: HttpClient, private router: Router) { }

    signupUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    signinUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                this.router.navigate(['/'])
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => this.token = token)
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
    }

    getUsersData() {
        const token = this.getToken()
        return this.http.get('https://identitycards-users.firebaseio.com/users.json?auth=' + token);
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then((token: string) => this.token = token);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}