import { map } from 'rxjs/operators';
import { ArtistService } from './../services/artist.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgProgress } from '@ngx-progressbar/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-artist-update',
  templateUrl: './artist-update.component.html',
  styleUrls: ['./artist-update.component.css']
})
export class ArtistUpdateComponent implements OnInit {

  id: number;
  artist: Array<any> = [];
  ArtistUpdate: FormGroup;
  ArtistImage: File = null;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private progressBar: NgProgress,
  ) { 
    this.ArtistUpdate = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      birthday: new FormControl(''),
      photo: new FormControl('')
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      params =>{
        this.id = params.id;
        this.get(this.id);
      }
    )
  }

  get(id: number) {
    this.artistService.getOne(id).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.artist = data;
    })
  }

  onSubmit() {
    this.progressBar.start();
    let fd = new FormData();
    if(this.ArtistUpdate.get('name').dirty){
      fd.append('name', this.ArtistUpdate.get('name').value);
    }
    if(this.ArtistUpdate.get('surname').dirty){
      fd.append('surname', this.ArtistUpdate.get('surname').value);
    }
    if(this.ArtistUpdate.get('birthday').dirty){
      fd.append('birthday', this.ArtistUpdate.get('birthday').value);
    }
    if(this.ArtistImage != null){
      fd.append('artistphoto', this.ArtistImage, this.ArtistImage.name);
    }
    this.artistService.update(fd, this.id).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.progressBar.complete();
      this.ArtistImage = null;
      Swal(
        'Rəssam redakte edildi!',
        '',
        'success'
      );
      this.get(this.id);
    }, errors => {
      this.progressBar.complete();
      switch(errors.status){
        case 422:
        var error_text = "Dəstəklənməyən fayl tipi";
        break;
        default:
        var error_text = "Bilinməyən səhvlik";
        break;
      }

      Swal({
        type: 'error',
        title: 'Səhvlik...',
        text: `${error_text!}`
      });
    })
  }

  uploadImage(event) {
    this.ArtistImage = <File>event.target.files[0];
  }

}
