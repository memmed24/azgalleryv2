import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../common/auth.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { NgProgress } from '@ngx-progressbar/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-site',
	templateUrl: './site.component.html',
	styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

	constructor(
		private modalService: NgbModal,
		private modal: NgbActiveModal,
		private authService: AuthService,
		private cookieService: CookieService,
		private progressBar: NgProgress,
		private router: Router
	) { }
	
	closeResult: string;
	ngOnInit() {
		this.authService.loggedUser().pipe(
			map(res => {
				return res.json()
			})
		).subscribe(data => {
			this.cookieService.delete('user_status');
			this.cookieService.set('user_status', data['role']);
		}, errors => {
			this.cookieService.deleteAll();
			this.router.navigate(['login']);
			console.clear();
		});
	}

	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			console.log(this.closeResult);
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

	

}