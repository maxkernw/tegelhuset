import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.user.subscribe(res => res ? this.isLoggedIn = true : this.isLoggedIn = false);
  }
  logout() {
    this.auth.logout();
  }
}
