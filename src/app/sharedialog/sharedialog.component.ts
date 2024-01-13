import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { read } from 'original-fs';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.scss']
})
export class SharedialogComponent implements OnInit {
  fileName = '';
  filetoupload: any
  role = ''
  userid: any
  data: any
  share: any = false;
  selectedFW = new FormControl();
  Email: string[] = [];
  btn: any
  read1: any
  write1: any
  data1: any
  id: any
  filename: any;
  ngOnInit(): void {
    
  }
  constructor(
    public dialogRef: MatDialogRef<SharedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data2: any
    , private service: ApiService, private toaster: NotificationService) {
    this.filename = data2.filename;
    this.Email = data2.Email;
  }

  close() {
    this.dialogRef.close();
  }
  form = new FormGroup({
    read: new FormControl(),
    write: new FormControl(),
    cowner: new FormControl()
  })

  onSubmit(form: any) {
    console.log("hello");
    if (form.value.read == true) {
      this.read1 = 1
    }
    else {
      this.read1 = 0
    }
    if (form.value.write == true) {
      this.write1 = 1
    }
    else {
      this.write1 = 0
    }
    if (form.value.cowner == true) {
      this.read1 = 1
      this.write1 = 1
      this.role = "co-owner"
    }
    else {
      this.role = "user"
    }
    if (form.value.read || form.value.write || form.value.cowner) {
      this.service.getidbyemail(this.selectedFW.value).subscribe(res => {
        this.data1 = res;
        console.log("ID OF USER", this.data1[0].id);
        this.id = this.data1[0].id;
        this.service.sharefile(this.filename, this.data1[0].id, this.read1, this.write1, this.role).subscribe(res => {
          console.log(res);
          this.toaster.showSuccess("File Shared Successfully!!")
          this.close();

        })
        var fileData = new FormData();
      })
    }
    else {
      this.toaster.showInfo("Atleast give one permission")
    }

    console.log(this.read1);
    console.log(this.selectedFW.value);

  }


}





