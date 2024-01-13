import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { IFileUpload } from '../shared-with-me-file/shared-with-me-file.component';

@Component({
  selector: 'app-infodialoge',
  templateUrl: './infodialoge.component.html',
  styleUrls: ['./infodialoge.component.scss']
})
export class InfodialogeComponent implements OnInit {
  count: any
  Email: any;
  dataArray: any;
  writeAccess: any
  readAccess: any
  saveinfo: any;
  totalcount: any;
  
  
  constructor(
    public dialogRef: MatDialogRef<InfodialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    , private service: ApiService) {
    this.count = data.count;
    this.dataArray = data.Datasave;
    console.log(this.count);
    console.log(this.dataArray);

  }

  displayedColumns: string[] = ['srno', 'email', 'role', 'readfile', 'writefile', 'revoke'];
  public dataSource!: MatTableDataSource<IFileUpload>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getALlfiles();

  }


  getALlfiles() {

    this.service.getInfo(this.dataArray).subscribe(res=>{
      this.saveinfo=res;
      this.totalcount=this.saveinfo.length
      console.log("totalcount",this.totalcount);
      console.log(this.saveinfo);
      this.dataSource = new MatTableDataSource<IFileUpload>(this.saveinfo);
    this.dataSource.sort = this.sort;
    })
  
  }
  revoke(fileid: any) {

    this.service.revokepermission(fileid).subscribe(res => {
     this.ngOnInit()
    })
  }
  setPermission(fileid: any) {

    this.service.setPermission(fileid).subscribe(res => {
     this.ngOnInit()
    })
  }
  changeWriteaccess(fileid: any, write: any) {
    this.writeAccess = !write

    if (this.writeAccess) {
      this.writeAccess = 1

    }
    else {
      this.writeAccess = 0
    }
    console.log(!write);

    this.service.writeAccess(fileid, this.writeAccess).subscribe(res => {
      console.log(res);
      this.ngOnInit();
      // window.location.href='InfodialogeComponent'

    })

  }
  changeReadaccess(fileid: any, read: any){
    this.readAccess = !read

    if (this.readAccess) {
      this.readAccess = 1

    }
    else {
      this.readAccess = 0
    }   
    this.service.readAccess(fileid, this.readAccess).subscribe(res => {
      console.log(res);
      this.ngOnInit()
      // window.location.href='InfodialogeComponent'

    })
  }

}
