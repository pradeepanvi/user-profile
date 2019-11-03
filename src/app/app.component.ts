import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'profile';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCDDpM5DcaNwheiuFFHAAsifYxKBOZV3uQ",
      authDomain: "https://identitycards-3b7a2.firebaseio.com",
    });
  }
}
