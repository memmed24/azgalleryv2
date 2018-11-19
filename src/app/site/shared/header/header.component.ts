import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { AuthService } from 'src/app/common/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('dropDown') dropDown: ElementRef;
  @ViewChild('dropDownLi') dropDownLi: ElementRef;

  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private progressBar: NgProgress,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAdmin = (this.cookieService.get('user_status') === '1');
  }

  drpDwn(): void {
    if (this.dropDown.nativeElement.classList.contains('show')) {
      this.dropDown.nativeElement.classList.remove('show');
      this.dropDownLi.nativeElement.classList.remove('show');
    } else {
      this.dropDown.nativeElement.classList.add('show');
      this.dropDownLi.nativeElement.classList.add('show');
    }
  }

  logout(): void {
    Swal({
      title: 'Hesabdan çıxılsın?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Çıx',
      cancelButtonText: 'Xeyr'
    }).then((result) => {
      if (result.value) {
        this.progressBar.start();
        this.authService.logout().pipe(
          map(res => {
            return res.json()
          })
        ).subscribe(data => {
          this.cookieService.deleteAll();
          this.progressBar.complete();
          this.router.navigate(['/login']);
        }, errors => {
          this.progressBar.complete();
          Swal({
            type: 'error',
            title: 'Səhvlik...',
            text: `Bilinməyən səhvlik`
          });
        })
      }
    })
  }

}
