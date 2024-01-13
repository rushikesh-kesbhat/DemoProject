import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

interface verifyEmail {
  email: any
}

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.scss']
})
export class OtpverificationComponent implements OnInit {
  resend: boolean = false
  otp: any
  verify: any
  toEmail: any
  showOtpComponent = true
  localstore: any
  data: any
  status: boolean = false
  loading = false;
  saveLocal: any

  myform = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.email]),

  })
  constructor(private apiservice: ApiService, private router: Router, private toaster: NotificationService) {
    this.verify = false


  }
  ngOnInit(): void {
  }
  onSubmit(form: any) {
    if (this.myform.valid) {
      this.loading = true;
      this.toEmail = this.myform.value
      console.log(form.value);
      console.log("saved data", this.toEmail.to);
      this.apiservice.getDetails(form.value).subscribe(res => {
        this.data = res
        // console.log(this.data[6].email);
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].email === this.toEmail.to) {
            this.status = true
            localStorage.setItem("id", this.data[i].id)
            localStorage.setItem("fname", this.data[i].fname)
            localStorage.setItem("email", this.data[i].email)
            this.apiservice.postotp(this.myform.value).subscribe((res: any) => {
              this.verify = true;
              this.otp = res
              console.log(res);
            })
          }
        }
        if (this.status == false) {
          this.toaster.showError("Please Enter Registerd Email Id")
          console.log("wrong");
          this.loading = false
        }
      }
      )
    }
  }
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '50px'
    }
  };
  onOtpChange(otp: any) {
    console.log("sent otp", this.otp);

    if (otp.length == 6 && this.otp == otp) {
      console.log("verify")
      this.localstore = localStorage.getItem("forgotpass")
      this.saveLocal = localStorage.getItem('verifyEmail')
      if (this.localstore) {
        this.toaster.showSuccess("Verified!!")
        localStorage.setItem("email", this.toEmail.to)
        this.router.navigate(["forgotpassword"])
      }
      else if (this.saveLocal) {
        const obj = {} as verifyEmail;
        obj.email = localStorage.getItem("email")
        console.log(obj.email);

        this.apiservice.verifyEmail(obj).subscribe(res => {
          console.log(res);
          this.toaster.showSuccess('Email Activated! Now You can Login')
          this.router.navigate(["login"])
        })
      }
      else {
        this.toaster.showSuccess("Verified!!")
        localStorage.setItem("layout", "dashboard")
        window.location.href = "dashboard"
      }
    }
    if (otp.length == 6 && this.otp != otp) {
      console.log("not verified");
      this.toaster.showError("Invalid OTP")
    }
  }
  clear() {
    this.myform.reset()
  }
  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 5000);
  }
}


