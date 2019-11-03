import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    signupUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));
    }

    signinUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}