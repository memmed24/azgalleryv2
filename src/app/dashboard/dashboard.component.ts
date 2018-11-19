import { CookieService } from 'ngx-cookie-service';
import { NgProgress } from '@ngx-progressbar/core';
import { AuthService } from './../common/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('dropDown') dropDown: ElementRef;
  @ViewChild('artworkCollapse') artworkCollapse: ElementRef;

  constructor(
    private authService: AuthService,
    private progressBar: NgProgress,
    private cookieService: CookieService,
    private router: Router
  ) { }

  admin_name: string = null;
  admin_surname: string = null;
  isAdmin: boolean = false;

  ngOnInit() {
    this.authService.loggedUser().pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.admin_name = data['name'];
      this.admin_surname = data['surname'];
      if(data['role'] !== 1){
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
      }
    });
  }


  drpDown() {
    if (this.dropDown.nativeElement.classList.contains('show')) {
      this.dropDown.nativeElement.classList.remove('show');
    } else {
      this.dropDown.nativeElement.classList.add('show');
    }
  }

  collapse(part: any){
    switch(part){
      case 'artworks':
      if (this.artworkCollapse.nativeElement.classList.contains('show')) {
        this.artworkCollapse.nativeElement.classList.remove('show');
      } else {
        this.artworkCollapse.nativeElement.classList.add('show');
      }
      break;
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