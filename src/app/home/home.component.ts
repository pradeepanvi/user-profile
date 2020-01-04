import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface userData {
  displayName: any;
  email: any;
  emailVerified: any;
  phoneNumber: any;
  photoURL: any;
  lastSignInTime: any;
  creationTime: any;
  addressItems: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  userData: any;
  displayName: any;
  email: any;
  emailVerified: any;
  phoneNumber: any;
  photoURL: any;
  lastSignInTime: any;
  creationTime: any;
  addressItems: any;
  constructor(private _authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._authService.getCurrentUserData().subscribe((res: userData) => {
      this.userData = res;
      this.displayName = res.displayName;
      this.email = res.email;
      this.emailVerified = res.emailVerified;
      this.phoneNumber = res.phoneNumber;
      this.photoURL = res.photoURL;
      this.creationTime = res.creationTime;
      this.lastSignInTime = res.lastSignInTime;
      this.addressItems = res.addressItems;
      this._authService.userData = res;
    });
  }

  editProfile() {
    this.router.navigate(['edit-profile'], { relativeTo: this.route })
  }

}
