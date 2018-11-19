import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private progressBar: NgProgress
  ) { 
    // constructor should be used only as a Dependency Injection as much as possible
    }

  ngOnInit() {
      this.LoginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    if(this.progressBar.isStarted()){
      this.progressBar.complete();
    }
  }

  onSubmit() {
    this.progressBar.start();
    let data = this.LoginForm.value;
    this.authService.login(data).pipe(
      map(data => {
        return data.json();
      }) // why? as a default it should return json
    ).subscribe(data => {
      this.progressBar.complete();
      this.cookieService.set('api_token', data['token']);
      this.cookieService.set('user_status', data['user_status']);
      this.router.navigate(['/']);
    }, error => {
      this.progressBar.complete();
      switch (error.status) {
        case 404:
          var error_text = "İstifadəçi tapılmadı";
          break;
        case 403:
          var error_text = "Yalnış şifrə";
          break;

      }
      Swal({
        type: 'error',
        title: 'Səhvlik...',
        text: `${error_text!}`
      });
    })

  }

}
