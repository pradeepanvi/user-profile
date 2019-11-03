import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this._authService.signinUser(email, password);
  }

  private initForm() {
    this.signinForm = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control('')
    })
  }
}
