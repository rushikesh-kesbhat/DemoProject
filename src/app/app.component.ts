import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('email') === null && localStorage.getItem('id') === null && localStorage.getItem('layout') === null && localStorage.getItem('fname') === null) {
      this.router.navigate(['']);
    }
  }
  title = 'DemoProject';
}


