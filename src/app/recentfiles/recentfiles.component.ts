import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IFileUpload } from '../shared-with-me-file/shared-with-me-file.component';

@Component({
  selector: 'app-recentfiles',
  templateUrl: './recentfiles.component.html',
  styleUrls: ['./recentfiles.component.scss']
})
export class RecentfilesComponent implements OnInit {

  showtable: any
  email = localStorage.getItem('email')

  inputdata: any


  filename: any
  ash = true

  displayedColumns: string[] = ['fileid', 'fileName', 'readfile', 'writefile', 'remove', 'shareby'];
  public dataSource!: MatTableDataSource<IFileUpload>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private dataArray: any;
  constructor(private router: Router, private service: ApiService) { }
  ngOnInit(): void {
    this.getALlfiles();
  }
  readfile(file: any) {
    window.open("http://127.0.0.1:8887/" + file)
  }

  getALlfiles() {

    const obj2 = {} as IFileUpload;
    obj2.userid = localStorage.getItem('id')
    console.log(obj2);

    this.service.getRecentFiles(obj2).subscribe(res => {
      console.log(res);

      this.dataArray = res
      this.dataSource = new MatTableDataSource<IFileUpload>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }



  delete(fileid: any) {
    this.service.deleteFile(fileid).subscribe(res => {
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

}
