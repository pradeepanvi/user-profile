import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})

export class AuthService {
    constructor(private http: HttpClient) { }

    signupUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));
    }

    signinUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    getUsersData() {
        return this.http.get('https://identitycards-users.firebaseio.com/users.json');
    }
}