import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IFileUpload } from '../shared-with-me-file/shared-with-me-file.component';
import { ipcMain, shell } from 'electron';
import { MatDialog } from '@angular/material/dialog';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';
import { InfodialogeComponent } from '../infodialoge/infodialoge.component';

@Component({
  selector: 'app-showallfiles',
  templateUrl: './showallfiles.component.html',
  styleUrls: ['./showallfiles.component.scss']
})
export class ShowallfilesComponent implements OnInit {

  inputdata: any
  showtable: any
  email = localStorage.getItem('email')
  filename: any
  ash = true
  role_owner: any = "owner"
  Email: string[] = [];
  animal!: string; datasave: any
  name!: any;
  saveinfo: any
  totalcount: any
  EmailInfo: string[] = [];

  displayedColumns: string[] = ['fileid', 'fileName', 'readfile', 'writefile', 'remove', 'shareby', 'role', 'totalcount'];
  public dataSource!: MatTableDataSource<IFileUpload>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private dataArray: any;
  constructor(private router: Router, private service: ApiService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getALlfiles();
  }
  getALlfiles() {
    const obj2 = {} as IFileUpload;
    obj2.userid = localStorage.getItem('id')
    console.log(obj2);
    this.service.getAllFiles(obj2).subscribe((res: any) => {
      console.log(res.role);
      this.dataArray = res
      this.dataSource = new MatTableDataSource<IFileUpload>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  readfile(file: any) {

    window.open("http://127.0.0.1:8887/" + file)
  }
  delete(fileid: any) {
    this.service.deleteFile(fileid).subscribe((res: any) => {
      console.log(res)
      this.ngOnInit();
      console.log("Deleted Succesfullly!!")
    })
  }
  writefile(filename: any) {
    this.ash = false
    this.filename = filename
    this.service.gettext(filename).subscribe((res: any) => {
      this.inputdata = new FormControl('')
      this.inputdata.setValue(res);
    })
  }
  writeinfile(txt: any) {
    this.ash = true
    this.service.settext(this.filename, txt.value).subscribe((res: any) => {
    })
    console.log(txt.value);
  }
  cancel() {
    this.ash = true
  }
  openDialog(filename: any) {
    this.service.getDetails(localStorage.getItem('id')).subscribe(res => {
      this.datasave = res;
      console.log(this.datasave.length);
      // this.Email=[]
      this.Email.length = 0;
      for (let i = 0; i < this.datasave.length; i++) {  
        this.Email.push(this.datasave[i].email);       
      }
    })
    const dialogRef = this.dialog.open(SharedialogComponent, {
      data: {
        filename,
        Email: this.Email
      }
    });
  }
  openInfoDialog(filename: any) {
    const dialogRef = this.dialog.open(InfodialogeComponent, {
      data: {
        count: this.totalcount,
        Datasave: filename
      }
    });
  }
}





