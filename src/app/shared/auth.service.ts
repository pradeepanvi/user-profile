import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface userData {
    user: {
        ma: any;
        email: any;
        emailVerified: any;
        isAnonymous: any;
        phoneNumber: any;
        photoURL: any;
        metadata: {
            creationTime: any;
            lastSignInTime: any;
        }
        uid: any;
    };
    additionalUserInfo: {
        isNewUser: any;
    }
}

@Injectable({
    providedIn: "root"
})

export class AuthService {
    token: any;
    userData: any;
    userUID: any;

    constructor(private http: HttpClient, private router: Router) { }

    signupUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                const token = res.user.ma;
                const userData = {
                    email: res.user.email,
                    emailVerified: res.user.emailVerified,
                    isAnonymous: res.user.isAnonymous,
                    phoneNumber: res.user.phoneNumber,
                    photoURL: res.user.photoURL,
                    isNewUser: res.additionalUserInfo.isNewUser,
                    creationTime: res.user.metadata.creationTime,
                    lastSignInTime: res.user.metadata.lastSignInTime,
                    uid: res.user.uid
                }
                this.userData = userData;
                console.log(token);
                this.http.put(`https://identitycards-users.firebaseio.com/users/${this.userData.uid}.json?auth=${token}`, this.userData).subscribe(
                    res => console.log(res)
                );
            })
            .catch(error => console.log(error));
    }

    signinUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                this.router.navigate(['/'])
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => this.token = token)
                console.log(res);
                this.userUID = res.user.uid;
            })
            .catch(err => console.log(err))

    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
    }

    getCurrentUserData() {
        const token = this.getToken();
        return this.http.get(`https://identitycards-users.firebaseio.com/users/${this.userUID}.json?auth=${token}`)
    }

    getUsersData() {
        const token = this.getToken();
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

    saveUserData(userData = '') {
        this.http.put(`https://identitycards-users.firebaseio.com/users/${this.userUID}.json?auth=${this.token}`, userData).subscribe(
            res => console.log(res)
        );
    }
}