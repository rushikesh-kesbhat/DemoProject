import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../confirm-password.validatior';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  pass: any
  cpass: any
  data: any
  status: boolean = false
  constructor(private router: Router, private fb: FormBuilder, private service: ApiService, private toastr: NotificationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      designation: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cpassword: [null, [Validators.required]]
    },
      {
        validator: ConfirmPasswordValidator("password", "cpassword")
      }
    );
  }
  saveDetails(form: any) {

    if (this.form.valid) {
      this.service.getDetails(form.value).subscribe(res => {
        this.data = res
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].email == form.value.email) {
            this.status = true
            this.toastr.showError("Email id is already Registered");

          }
        }
        if (this.status == false) {
          console.log(this.form);
          this.service.postDetails(form.value).subscribe(res => {
            console.log(res);
            this.toastr.showSuccess("Registration successfully Done !!")
            this.router.navigate(['login'])
          })
        }
      })
    }
  }
}

