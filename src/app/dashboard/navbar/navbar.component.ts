import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('drop') drpDwn: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  dropDown() {
    if(this.drpDwn.nativeElement.classList.contains('show')){
      this.drpDwn.nativeElement.classList.remove('show');
    }else{
      this.drpDwn.nativeElement.classList.add('show');
    }
  }

}
