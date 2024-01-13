import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  flag: boolean = false;
  data: any
  datalist: any
  status: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private service: ApiService, private toaster: NotificationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      fname: [null],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
    localStorage.clear()

  }
  saveDetails(form: any) {
    this.datalist = this.form.value
    this.service.getDetails(form.value).subscribe(res => {
      this.data = res
      console.log(this.data)
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].email === form.value.email && this.data[i].password === form.value.password)  {
          debugger
          console.log(this.data[i].isActive);
          
          if(this.data[i].isActive =='0')
          {
            
            this.toaster.showError(this.data[i].email+' is Not Active')
          }
          else{
            this.status = true
            console.log(this.status);
            console.log("correct ", this.data[i].fname);
            localStorage.setItem("layout", "dashboard")
            localStorage.setItem("id", this.data[i].id)
            localStorage.setItem("email", this.data[i].email)
            localStorage.setItem("fname", this.data[i].fname)
            this.toaster.showSuccess("You have Loggedin Successfully!!")
            window.location.href = "dashboard"
          }
          
        }
      }
      if (this.status == false) {
        console.log("correct not");
        this.toaster.showError("Email or Password is Incorrect")
      }
    })
  }
  forgotpass() {
    localStorage.setItem("forgotpass", "yes")
  }
  verifyEmail() {
    localStorage.setItem("verifyEmail", "yes")
  }
}
