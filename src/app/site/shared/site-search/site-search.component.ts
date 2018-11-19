import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-search',
  templateUrl: './site-search.component.html',
  styleUrls: ['./site-search.component.css']
})
export class SiteSearchComponent implements OnInit {

  searchForm: FormGroup;
  @Output() query =  new EventEmitter<any>();

  constructor(
  ) {  
    this.createForm();
  }

  createForm(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  search() {
    if(this.searchForm.get('query').dirty && this.searchForm.valid) {
      this.query.emit(this.searchForm.value);
    }
  }

}
