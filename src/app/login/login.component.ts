import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }


  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then(() => {
        this.router.navigate(['calendar']);
      })
      .catch((err) => console.log(err));
  }


  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(() => {
        this.router.navigate(['calendar']);
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.router.navigate(['calendar']);
      })
      .catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
      .then(() => {
        this.router.navigate(['calendar']);
      })
      .catch((err) => console.log(err));
  }

  signInWithEmail() {

    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['calendar']);
      })
      .catch((err) => console.log('error: ' + err));
  }

  ngOnInit() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.router.navigate(['/calendar']);
      }
    });
  }

}
