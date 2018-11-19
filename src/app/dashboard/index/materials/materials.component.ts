import { MaterialService } from './../../services/material.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  private closeResult: string = "";
  modalReference: any;

  createForm: FormGroup;
  updateForm: FormGroup;

  materials: Array<string> = [];

  constructor(
    private modalService: NgbModal,
    private materialService: MaterialService,
    private progressBar: NgProgress
  ) {
    this.createForm = new FormGroup({
      name: new FormControl('')
    });
    this.updateForm = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.getAll();
  
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

  getAll() {
    this.materialService.get().pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.materials = data;
    })
  }

  onSubmit() {
    this.progressBar.start();
    this.materialService.create(this.createForm.value).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.progressBar.complete();
      this.createForm.reset();
      Swal(
        'Material yaradıldı!',
        '',
        'success'
      )
      this.modalReference.close();
      this.getAll();

    }, errors => {
      this.progressBar.complete();
      Swal({
        type: 'error',
        title: 'Səhvlik...',
        text: `Bilinməyən səhvlik`
      });
    });
  }

  update(id: number): void {
    if (this.updateForm.get('name').dirty) {
      this.progressBar.start();
      this.materialService.update(this.updateForm.value, id).pipe(
        map(res => {
          return res.json()
        })
      ).subscribe(data => {
        this.progressBar.complete();
        this.updateForm.reset();
        Swal(
          'Material redkate olundu!',
          '',
          'success'
        )
        this.modalReference.close();
        this.getAll();

      }, errors => {
        this.progressBar.complete();

        Swal({
          type: 'error',
          title: 'Səhvlik...',
          text: `Bilinməyən səhvlik`
        });
      });
    }
  }

  delete(id: number): void {
    Swal({
      title: 'Silməyə əminsiz?',
      text: "Geri qayatara bilməyəcəksiz",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil',
      cancelButtonText: 'Xeyr'
    }).then((result) => {
      if (result.value) {
        this.progressBar.start();
        this.materialService.delete(id).pipe(
          map(res => {
            return res.json()
          })
        ).subscribe(data => {
          this.progressBar.complete();
          this.getAll();

        }, errors => {
          Swal({
            type: 'error',
            title: 'Səhvlik...',
            text: `Bilinməyən səhvlik`
          });
        });
      }
    });
    
  }
}