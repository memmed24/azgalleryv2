import { ArtworkService } from './../artwork.service';
import { FondService } from './../../services/fond.service';
import { MaterialService } from './../../services/material.service';
import { CountryService } from './../../services/country.service';
import { CityService } from './../../services/city.service';
import { CategoryService } from './../../services/category.service';
import { ArtistService } from './../../services/artist.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  artists: Array<any> = [];
  categories: Array<any> = [];
  cities: Array<any> = [];
  countries: Array<any> = [];
  materials: Array<any> = [];
  fonds: Array<any> = [];
  artworkImage: File = null;
  contract_types: Array<string> = ["Rey", "Emr"];

  constructor(
    private artistService: ArtistService,
    private categoryService: CategoryService,
    private cityService: CityService,
    private countryService: CountryService,
    private materialService: MaterialService,
    private fondService: FondService,
    private progressBar: NgProgress,
    private artworkService: ArtworkService
  ) {
    this.formCreate();
  }

  ngOnInit() {
    this.getAllArtist();
    this.getAllCategories();
    this.getAllCountries();
    this.getAllMaterials();
    this.getAllFonds();
  }

  formCreate(): void {
    this.createForm = new FormGroup({
      name: new FormControl(''), // +
      category_id: new FormControl(''),  // +
      artist_id: new FormControl(''), // +
      height: new FormControl(''), // +
      width: new FormControl(''),  // +
      inventory_number: new FormControl(''),// +
      condition: new FormControl(''), // +
      amount: new FormControl(''), // +
      info: new FormControl(''), // +
      city_id: new FormControl(''), // +
      created: new FormControl(''), // +
      price_azn: new FormControl(''), // +
      price_rubl: new FormControl(''), // +
      material_id: new FormControl(''), // +
      fond_id: new FormControl(''), // +
      expire: new FormControl(''),
      rack: new FormControl(''), // +
      type: new FormControl('1'), // +
      number: new FormControl(''), // +
      signed_date: new FormControl(''), // +
      from: new FormControl(''), // +
      to: new FormControl(''), // +
      country_id: new FormControl(''),
      photo: new FormControl('') // + 
    });

  }

  getAllArtist() {
    this.artistService.getAll().pipe(
      map(res => {
        return res.json();
      })
    ).subscribe(data => {
      this.artists = data['data'];
    });
  }

  getAllCategories(): void {
    this.categoryService.get().pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.categories = data;
    })
  }

  getAllCities(country: number): void {
    this.cityService.getCityByCountry(country).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.cities = data;
      if (this.cities.length > 0) {
        this.createForm.get('city_id').setValue(this.cities[0].id);
      }
    })
  }

  getAllCountries(): void {
    this.countryService.getAll().pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.countries = data;
    })
  }

  getAllMaterials(): void {
    this.materialService.get().pipe(
      map(res => {
        return res.json()
      })
    )
      .subscribe(data => {
        this.materials = data;
      })
  }

  getAllFonds(): void {
    this.fondService.get().pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      this.fonds = data;
    })
  }

  onSubmit() {
    this.progressBar.start();
    let fd = new FormData();
    if (this.createForm.get('name').dirty) {
      fd.append('name', this.createForm.get('name').value);
    }
    if (this.createForm.get('category_id').dirty && this.createForm.get('category_id').value !== null) {
      fd.append('category_id', this.createForm.get('category_id').value);
    }
    if (this.createForm.get('artist_id').dirty && this.createForm.get('artist_id').value !== null) {
      fd.append('artist_id', this.createForm.get('artist_id').value);
    }
    if (this.createForm.get('city_id').dirty && this.createForm.get('city_id').value !== null) {
      fd.append('city_id', this.createForm.get('city_id').value);
    }
    if (this.createForm.get('material_id').dirty && this.createForm.get('material_id').value !== null) {
      fd.append('material_id', this.createForm.get('material_id').value);
    }
    if (this.createForm.get('fond_id').dirty && this.createForm.get('fond_id').value !== null) {
      fd.append('fond_id', this.createForm.get('fond_id').value);
    }
    if (this.createForm.get('height').dirty && this.createForm.get('height').value !== null) {
      fd.append('height', this.createForm.get('height').value);
    }
    if (this.createForm.get('width').dirty && this.createForm.get('width').value !== null) {
      fd.append('width', this.createForm.get('width').value);
    }
    if (this.createForm.get('inventory_number').dirty && this.createForm.get('inventory_number').value !== null) {
      fd.append('inventory_number', this.createForm.get('inventory_number').value);
    }
    if (this.createForm.get('condition').dirty && this.createForm.get('condition').value !== null) {
      fd.append('condition', this.createForm.get('condition').value);
    }
    if (this.createForm.get('amount').dirty && this.createForm.get('amount').value !== null) {
      fd.append('amount', this.createForm.get('amount').value);
    }
    if (this.createForm.get('info').dirty && this.createForm.get('info').value !== null) {
      fd.append('info', this.createForm.get('info').value);
    }
    if (this.createForm.get('created').dirty && this.createForm.get('created').value !== null) {
      fd.append('created', this.createForm.get('created').value);
    }
    if (this.createForm.get('price_azn').dirty && this.createForm.get('price_azn').value !== null) {
      fd.append('price_azn', this.createForm.get('price_azn').value);
    }
    if (this.createForm.get('price_rubl').dirty && this.createForm.get('price_rubl').value !== null) {
      fd.append('price_rubl', this.createForm.get('price_rubl').value);
    }
    if (this.createForm.get('expire').dirty && this.createForm.get('expire').value !== null) {
      fd.append('expire', this.createForm.get('expire').value);
    }
    if (this.createForm.get('rack').dirty && this.createForm.get('rack').value !== null) {
      fd.append('rack', this.createForm.get('rack').value);
    }
    if (this.createForm.get('type').dirty && this.createForm.get('type').value !== null) {
      fd.append('type', this.createForm.get('type').value);
    } 
    if (this.createForm.get('number').dirty && this.createForm.get('number').value !== null) {
      fd.append('number', this.createForm.get('number').value);
    } 
    if (this.createForm.get('signed_date').dirty && this.createForm.get('signed_date').value !== null) {
      fd.append('signed_date', this.createForm.get('signed_date').value);
    } if (this.createForm.get('from').dirty && this.createForm.get('from').value !== null) {
      fd.append('from', this.createForm.get('from').value);
    }
    if (this.createForm.get('to').dirty && this.createForm.get('to').value !== null) {
      fd.append('to', this.createForm.get('to').value);
    }
    if (this.artworkImage != null)
      fd.append('artworkphoto', this.artworkImage, this.artworkImage.name);

    this.artworkService.create(fd).pipe(
      map(res => {
        return res.json()
      })
    ).subscribe(data => {
      Swal(
        'Əsər yaradıldı!',
        '',
        'success'
      )
      this.createForm.reset();
      this.progressBar.complete();
    }, error => {
      let error_text = "";
      Swal({
        type: 'error',
        title: 'Səhvlik...',
        text: `${error_text!}`
      });
      this.progressBar.complete();
    });
  }

  onCountryChange(): void {
    let country_id = this.createForm.get('country_id').value;
    this.getAllCities(country_id);
  }

  uploadImage(event): void {
    this.artworkImage = <File>event.target.files[0];
  }

}
