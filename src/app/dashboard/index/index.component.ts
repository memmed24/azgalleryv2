import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private countryService: CountryService
  ) { }


  ngOnInit() {
  }

  getIndexData() {
  }

}
