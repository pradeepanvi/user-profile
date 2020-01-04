import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface userData {
  addressItems: any;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  userData: any;
  addressItems: any;

  constructor(private _authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userData = this._authService.userData;
    this.addressItems = this._authService.userData.addressItems;
    this.initForm(this.userData);
    this.addAddressItem();
  }

  onSubmit() {
    this._authService.saveUserData(this.profileForm.value);
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  private initForm(userData) {
    this.profileForm = this.fb.group({
      displayName: this.fb.control(userData.displayName ? userData.displayName : ''),
      email: this.fb.control(userData.email ? userData.email : ''),
      emailVerified: this.fb.control(userData.emailVerified ? userData.emailVerified : ''),
      phoneNumber: this.fb.control(userData.phoneNumber ? userData.phoneNumber : ''),
      photoURL: this.fb.control(userData.photoURL ? userData.photoURL : ''),
      creationTime: this.fb.control(userData.creationTime ? userData.creationTime : ''),
      lastSignInTime: this.fb.control(userData.lastSignInTime ? userData.lastSignInTime : ''),
      uid: this.fb.control(userData.uid ? userData.uid : ''),
      addressItems: this.fb.array([])
    })
  }

  get addressItemsArray() {
    return this.profileForm.get('addressItems') as FormArray;
  }

  initAddressItem(name = '', mobile = '', pincode = '', address1 = '', address2 = '', landmark = '', city = '', state = '', addressType = '') {
    return this.fb.group({
      name: name,
      mobile: mobile,
      pincode: pincode,
      address1: address1,
      address2: address2,
      landmark: landmark,
      city: city,
      state: state,
      addressType: addressType
    })
  }

  addAddressItem() {
    if (this.addressItems) {
      for (let i = 0; i < this.addressItems.length; i++) {
        this.addressItemsArray.push(this.initAddressItem(this.addressItems[i].name, this.addressItems[i].mobile, this.addressItems[i].pincode, this.addressItems[i].address1, this.addressItems[i].address2, this.addressItems[i].landmark, this.addressItems[i].city, this.addressItems[i].state, this.addressItems[i].addressType));
      }
    }
  }

  addAddress() {
    this.addressItemsArray.push(this.initAddressItem());
  }

  removeAddress(index: number) {
    this.addressItemsArray.removeAt(index);
  }
}
