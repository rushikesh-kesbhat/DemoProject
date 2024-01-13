import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InfodialogeComponent } from '../infodialoge/infodialoge.component';
import { ApiService } from '../services/api.service';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';


export interface IFileUpload {
  fileid: any,
  fileName: any,
  userid: any
  shareby: any
  role: any
  email: any
}

@Component({
  selector: 'app-shared-access',
  templateUrl: './shared-access.component.html',
  styleUrls: ['./shared-access.component.scss']
})
export class SharedAccessComponent implements OnInit {

  inputdata: any
  showtable: any
  email = localStorage.getItem('email')
  filename: any
  ash = true
  role_owner: any = "owner"
  Email: string[] = [];
  animal!: string; datasave: any
  name!: string;
  saveinfo: any
  totalcount: any
  EmailInfo: string[] = [];

  displayedColumns: string[] = ['fileid', 'fileName', 'remove', 'shareby', 'role', 'totalcount'];
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
    obj2.shareby = localStorage.getItem('email')
    console.log(obj2);

    this.service.uploadedByMe(obj2).subscribe((res: any) => {
      console.log(res.role);


      this.dataArray = res
      //  console.log("Role",this.dataArray.value.role);

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
      console.log(res);

      this.inputdata = new FormControl('')
      this.inputdata.setValue(res);
    })

  }
  writeinfile(txt: any) {
    this.ash = true
    console.log(txt.value);
    this.service.settext(this.filename, txt.value).subscribe((res: any) => {
    })
  }
  cancel() {
    this.ash = true
  }
  openDialog(filename: any) {
    this.service.getDetails(localStorage.getItem('id')).subscribe(res => {
      this.datasave = res;
      console.log(this.datasave.length);
      for (let i = 0; i < this.datasave.length; i++) {  // loop through the object array
        this.Email.push(this.datasave[i].email);        // push each element to sys_id
      }

    })
    const dialogRef = this.dialog.open(SharedialogComponent, {
      data: {
        filename,
        Email: this.Email
        // content: 'This is the content of the dialog box.'
      }
    });
  }
  openInfoDialog(filename: any) {

    const dialogRef = this.dialog.open(InfodialogeComponent, {
  
      data: {  
        count:this.totalcount,
        Datasave:filename
      }
      
    });
  }

}
