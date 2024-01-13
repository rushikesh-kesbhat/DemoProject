import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../confirm-password.validatior';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

interface emailverify {
  email: string,
  password: string
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  email: any
  list = []
  localstoredata: any
  constructor(private apiservice: ApiService, private router: Router, private toaster: NotificationService, private fb: FormBuilder, private activate: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpassword: new FormControl('', [Validators.required]),
    },
      {
        validators: ConfirmPasswordValidator("password", "cpassword")
      }
    );
    this.localstoredata = localStorage.getItem("email")
    console.log(this.localstoredata);
  }
  onSubmit(form: any) {
    const obj2 = {} as emailverify;

    obj2.email = this.localstoredata;
    obj2.password = form.value.password;

    console.log(obj2);
    this.apiservice.forgotpass(obj2).subscribe(res => {
      console.log(res)
      this.toaster.showSuccess("Password Changed Successfully!!")
      this.router.navigate(['login'])

    })
  }
}
