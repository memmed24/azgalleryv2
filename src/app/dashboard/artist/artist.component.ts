import { NgProgress } from '@ngx-progressbar/core';
import { ArtistService } from './../services/artist.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  private closeResult: string = "";
  modalReference: any;


  ArtistCreate: FormGroup;
  ArtistImage: File = null;
  Artists: Array<any> = [];

  constructor(
    private artistService: ArtistService,
    private progressBar: NgProgress,
    private modalService: NgbModal,
    private modal: NgbActiveModal
  ) {
    this.ArtistCreate = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      birthday: new FormControl(''),
      photo: new FormControl('')
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.artistService.getAll().pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      console.log(data);
      this.Artists = data['data'];
    })
  }

  uploadImage(event): void {
    this.ArtistImage = <File>event.target.files[0];
  }

  create(): void {
    this.progressBar.start();
    let fd = new FormData();
    fd.append("name", this.ArtistCreate.get('name').value);
    fd.append("surname", this.ArtistCreate.get('surname').value);
    fd.append("birthday", this.ArtistCreate.get('birthday').value);
    if (this.ArtistImage != null) {
      fd.append('artistphoto', this.ArtistImage, this.ArtistImage.name);
    }
    this.artistService.create(fd).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.progressBar.complete();
      this.ArtistCreate.reset();
      this.ArtistImage = null;
      Swal(
        'Rəssam yaradıldı!',
        '',
        'success'
      )
      this.modalReference.close();
      this.getAll();
    }, errors => {
      this.progressBar.complete();
      switch (errors.status) {
        case 422:
          var error_text = "Dəstəklənməyən fayl tipi";
          break;
      }

      Swal({
        type: 'error',
        title: 'Səhvlik...',
        text: `${error_text!}`
      });

    });
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
        this.artistService.delete(id).pipe(
          map(res => {
            return res.json();
          })
        ).subscribe(data => {
          this.progressBar.complete();
          this.getAll();
        })
      }
    });
  }
}
