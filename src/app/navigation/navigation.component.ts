import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  dash: any
  show: boolean = false;
  getName: any
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private activate: ActivatedRoute) {
    this.getName = localStorage.getItem("fname")
    this.dash = localStorage.getItem("layout")
  }
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.dash = localStorage.getItem("layout")



    console.log(this.getName);

    if (this.dash != "dashboard") {
      this.show = true
    }
    else {
      this.show = false
    }
  }

  logout() {
    localStorage.clear()
    this.ngOnInit()
    localStorage.clear()
    window.location.href = "login"
  }
  register() {
    localStorage.clear()
    if (this.show == false) {
      this.ngOnInit()
      window.location.href = "register"
    }
    this.router.navigate(['/register'])

  }

}
