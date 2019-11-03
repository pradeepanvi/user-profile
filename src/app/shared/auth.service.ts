import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})

export class AuthService {
    token: any;

    constructor(private http: HttpClient) { }

    signupUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    signinUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => this.token = token)
                console.log(res);
            })
            .catch(err => console.log(err))
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
}