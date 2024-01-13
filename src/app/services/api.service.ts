import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  Baseurl = "http://localhost:8080/mini_project_5_0/"

  constructor(private http: HttpClient) { }
  // user Resigtration
  postDetails(data: any) {
    return this.http.post(`${this.Baseurl}save`, data)
  }
  getDetails(data: any) {
    return this.http.get(`${this.Baseurl}getuser`, data)
  }

  //forgotpassword
  forgotpass(data: any) {
    return this.http.put(`${this.Baseurl}updatepassword`, data)
  }

  //otp verification
  postotp(to: any) {
    return this.http.post(`${this.Baseurl}sendotp`, to)
  }

  //Files
  postfile(file: any) {

    return this.http.post(`${this.Baseurl}filesave?userid=` + localStorage.getItem('id') + '&readfile=1&writefile=1&shareby=' + localStorage.getItem('email') + '&role=owner', file)
  }
  getAllFiles(userid: any) {
    return this.http.post(`${this.Baseurl}getfiles`, userid)
  }
  getRecentFiles(userid: any) {
    return this.http.post(`${this.Baseurl}recentfiles`, userid)
  }
  deleteFile(fileid: any) {
    return this.http.delete(`${this.Baseurl}deletefile?fileid=` + fileid)
  }

  //Files share
  sharefile(filename: any, id: any, read1: any, write1: any, role: any) {

    return this.http.get(`${this.Baseurl}sharefile?userid=` + id + '&readfile=' + read1 + '&writefile=' + write1 + '&shareby=' + localStorage.getItem('email') + '&filename=' + filename + '&role=' + role)
  }
  //get id by email
  getidbyemail(email: any) {
    return this.http.get(`${this.Baseurl}getidbyemail?email=` + email)
  }
  sharewithme(obj: any) {
    return this.http.post(`${this.Baseurl}sharewithme`, obj)
  }
  gettext(filename: any) {
    return this.http.get(`${this.Baseurl}gettext?filename=` + filename, { responseType: 'text' })
  }
  settext(filename: any, txt: any) {
    return this.http.get(`${this.Baseurl}settext?filename=` + filename + `&txt=` + txt);
  }
  //get coowner
  getcoowner(obj: any) {
    return this.http.post(`${this.Baseurl}getcoowner`, obj)
  }
  getInfo(filename: any) {
    return this.http.get(`${this.Baseurl}sharedfileemail?filename=` + filename + `&shareby=` + localStorage.getItem('email'))
  }
  revokepermission(fileid: any) {
    return this.http.get(`${this.Baseurl}revokePermission?fileid=` + fileid)
  }
  setPermission(fileid: any) {
    return this.http.get(`${this.Baseurl}setPermission?fileid=` + fileid)
  }
  uploadedByMe(obj: any) {
    return this.http.post(`${this.Baseurl}uploadedbyme`, obj)
  }
  writeAccess(fileid: any, write: any) {
    return this.http.get(`${this.Baseurl}updatewrite?fileid=` + fileid + '&access=' + write)
  }

  readAccess(fileid: any, read: any) {
    return this.http.get(`${this.Baseurl}updateread?fileid=` + fileid + '&access=' + read)
  }

  verifyEmail(formdata:any) {
    debugger
    return this.http.put(`${this.Baseurl}isActiveEmail`,formdata)
  }
}
