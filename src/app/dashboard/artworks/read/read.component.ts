import { ConfigService } from './../../../common/config/config.service';
import { NgProgress } from '@ngx-progressbar/core';
import { ArtworkService } from './../artwork.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  artworks: Array<any> = [];
  total_page: number = 0;
  current_page: number = 1;
  pages;
  url: string = "";

  constructor(
    private artworkService: ArtworkService,
    private progressBar: NgProgress,
    private configService: ConfigService
  ) {
    this.progressBar.start();
  }

  ngOnInit() {
    this.url = this.configService.getUrl();
    this.getAllArtworks(this.current_page);
  }

  getAllArtworks(page: number): void {
    this.progressBar.start();
    this.artworkService.getAll(this.current_page).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.artworks = data['data'];
      this.total_page = data['last_page'];
      this.pages = new Array<number>(this.total_page);
      this.progressBar.complete();
    });
  }

  changePage(num: number): void {
    if (this.current_page != num) {
      this.current_page = num;
      this.getAllArtworks(this.current_page);
    }

  }

  paginator(direction: string): void {
    if (direction == "next") {

      if (this.current_page < this.total_page) {
        this.current_page++;
        this.getAllArtworks(this.current_page);
      }

    } else {
      if (this.current_page > 1) {
        this.current_page--;
        this.getAllArtworks(this.current_page);

      }
    }
  }

  delete(id: number): void {
    Swal({
      title: 'Silməyə əminsiz?',
      text: "Geri qayatara bilməyəcəksiniz",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil',
      cancelButtonText: 'Xeyr'
    }).then((result) => {
      if (result.value) {
        this.progressBar.start();
        this.artworkService.delete(id).pipe(
          map(res => {
            return res.json()
          })
        ).subscribe(data => {

          this.getAllArtworks(this.current_page);

        }, errors => {
          console.log(errors);
        })
      } 
    });
  }

}
