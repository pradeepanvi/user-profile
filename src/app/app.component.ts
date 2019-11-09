import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'profile';

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBQ1cFCPGhT39wrw8ldy69BVXksk8wFrgA",
      authDomain: "https://identitycards-users.firebaseio.com",
    });
  }

  getData() {
    this._authService.getUsersData().subscribe(res => console.log(res));
  }

  logOut() {
    this._authService.logOut();
  }

}
