import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  fileName = '';
  filetoupload: any
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

  constructor(private service: ApiService, private notify: NotificationService, private router: Router) {
    this.btn = false

  }
  form = new FormGroup({
    read: new FormControl(),
    write: new FormControl()
  })
  ngOnInit(): void {
  }
  sharewith() {
    this.share = true
  }
  onFilechange(event: any) {

    this.btn = true
    this.filetoupload = event.target.files[0]
    this.fileName = this.filetoupload.name;
    var fileData = new FormData();
    fileData.append('file', this.filetoupload)
    this.service.postfile(fileData).subscribe(res => {
      console.log(res);
      this.notify.showSuccess("File Uploaded Successfully!!")
      // this.router.navigate(['dasboard'])
      // window.location.href='allfiles'
    })
  }
}

