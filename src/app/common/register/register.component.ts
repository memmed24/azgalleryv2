import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;

  constructor(
    private progressBar: NgProgress,
    private authService: AuthService,
    private cookieService: CookieService,
    private rotuer: Router
  ) {
    this.RegisterForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      name: new FormControl(''),
      surname: new FormControl(''),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      about: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit() {
    if(this.progressBar.isStarted()){
      this.progressBar.complete();
    }
  }

  onSubmit() {
    this.progressBar.start();
    this.authService.register(this.RegisterForm.value).pipe(
      map(data => {
        return data.json();
      })
    ).subscribe(data => {
      this.progressBar.complete();
      this.cookieService.set('api_token', data['token']);
      this.rotuer.navigate(['/']);
    }, error => {
      console.log(error.status);
    });
  }

}