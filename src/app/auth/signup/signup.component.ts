import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, MinLengthValidator, Validators } from "@angular/forms";
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this._authService.signupUser(email, password);
  }

  private initForm() {
    this.signupForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    })
  }

}
