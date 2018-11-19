import { ArtworkService } from './../artwork.service';
import { FondService } from './../../services/fond.service';
import { MaterialService } from './../../services/material.service';
import { CountryService } from './../../services/country.service';
import { CityService } from './../../services/city.service';
import { CategoryService } from './../../services/category.service';
import { ArtistService } from './../../services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  private id: number;
  updateForm: FormGroup;
  artwork: Array<any>;
  artists: Array<any> = [];
  categories: Array<any> = [];
  cities: Array<any> = [];
  countries: Array<any> = [];
  materials: Array<any> = [];
  fonds: Array<any> = [];
  artworkImage: File = null;
  contract_types: Array<string> = ["Rey", "Emr"];

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private artistService: ArtistService,
    private categoryService: CategoryService,
    private cityService: CityService,
    private countryService: CountryService,
    private materialService: MaterialService,
    private fondService: FondService,
    private progressBar: NgProgress,
  ) { }

  ngOnInit() {
    this.createUpdateForm();
    this.subscribeId();
    this.getAllArtist();
    this.getAllCategories();
    this.getAllCountries();
    this.getAllMaterials();
    this.getAllFonds();
  }

  createUpdateForm(): any {
    this.updateForm = new FormGroup({
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

  subscribeId(): any {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getOne(this.id);
    });
  }

  getOne(id: number): any {
    this.artworkService.getOne(id).pipe(
      map(res => {
        return res.json();
      })
    ).subscribe(data => {
      this.artwork = data;
      console.log(this.artwork);
      this.assignValuesToFields();
    })
  }

  assignValuesToFields(): void {
    this.updateForm.get('name').setValue(this.artwork['name']);
    this.updateForm.get('height').setValue(this.artwork['height']);
    this.updateForm.get('width').setValue(this.artwork['width']);
    this.updateForm.get('inventory_number').setValue(this.artwork['inventory_number']);
    this.updateForm.get('condition').setValue(this.artwork['condition']);
    this.updateForm.get('amount').setValue(this.artwork['amount']);
    this.updateForm.get('price_azn').setValue(this.artwork['price_azn']);
    this.updateForm.get('price_rubl').setValue(this.artwork['price_rubl']);
    this.updateForm.get('created').setValue(this.artwork['created']);
    this.updateForm.get('rack').setValue(this.artwork['rack']);
    this.updateForm.get('info').setValue(this.artwork['info']);
    if (this.artwork['category']) this.updateForm.get('category_id').setValue(this.artwork['category']['id']);
    if (this.artwork['artist']) this.updateForm.get('artist_id').setValue(this.artwork['artist']['id']);
    if (this.artwork['city']) this.updateForm.get('city_id').setValue(this.artwork['city']['id']);
    if (this.artwork['material']) this.updateForm.get('material_id').setValue(this.artwork['material']['id']);
    if (this.artwork['fond']) this.updateForm.get('fond_id').setValue(this.artwork['fond']['id']);
    if (this.artwork['contract']) {
      this.updateForm.get('from').setValue(this.artwork['contract']['from']);
      this.updateForm.get('to').setValue(this.artwork['contract']['to']);
      this.updateForm.get('number').setValue(this.artwork['contract']['number']);
      this.updateForm.get('signed_date').setValue(this.artwork['contract']['signed_date ']);
      this.updateForm.get('type').setValue(this.artwork['contract']['type']);
    }

  }

  onSubmit(): void {
    this.progressBar.start();
    let fd = new FormData();
    let contract_edited = false;
    if (this.updateForm.get('inventory_number').dirty) fd.append('inventory_number', this.updateForm.get('inventory_number').value);
    if (this.updateForm.get('price_rubl').dirty) fd.append('price_rubl', this.updateForm.get('price_rubl').value);
    if (this.updateForm.get('price_azn').dirty) fd.append('price_azn', this.updateForm.get('price_azn').value);
    if (this.updateForm.get('condition').dirty) fd.append('condition', this.updateForm.get('condition').value);
    if (this.updateForm.get('category_id').dirty) fd.append('category_id', this.updateForm.get('category_id').value);
    if (this.updateForm.get('material_id').dirty) fd.append('material_id', this.updateForm.get('artist_id').value);
    if (this.updateForm.get('created').dirty) fd.append('created', this.updateForm.get('created').value);
    if (this.updateForm.get('height').dirty) fd.append('height', this.updateForm.get('height').value);
    if (this.updateForm.get('amount').dirty) fd.append('amount', this.updateForm.get('amount').value);
    if (this.updateForm.get('artist_id').dirty) fd.append('artist_id', this.updateForm.get('artist_id').value);
    if (this.updateForm.get('width').dirty) fd.append('width', this.updateForm.get('width').value);
    if (this.updateForm.get('name').dirty) fd.append('name', this.updateForm.get('name').value);
    if (this.updateForm.get('rack').dirty) fd.append('rack', this.updateForm.get('rack').value);
    if (this.updateForm.get('info').dirty) fd.append('info', this.updateForm.get('info').value);
    if (this.updateForm.get('city_id').dirty) fd.append('city_id', this.updateForm.get('city_id').value);
    if (this.updateForm.get('fond_id').dirty) fd.append('fond_id', this.updateForm.get('fond_id').value);

    if (this.updateForm.get('from').dirty) {
      contract_edited = true;
      fd.append('from', this.updateForm.get('from').value);
    }
    if (this.updateForm.get('to').dirty) {
      !contract_edited ? contract_edited = !contract_edited : '';
      fd.append('to', this.updateForm.get('to').value);
    }
    if (this.updateForm.get('number').dirty) {
      !contract_edited ? contract_edited = !contract_edited : '';
      fd.append('number', this.updateForm.get('number').value);
    }
    if (this.updateForm.get('signed_date').dirty) {
      !contract_edited ? contract_edited = !contract_edited : '';
      fd.append('signed_date', this.updateForm.get('signed_date').value);
    }

    if (this.updateForm.get('type').dirty) {
      !contract_edited ? contract_edited = !contract_edited : '';
      fd.append('type', this.updateForm.get('type').value);
    }
    fd.append('contract_edited', contract_edited.toString());

    this.artworkService.update(fd, this.id).pipe(
      map(res => {
        return res.json();
      })
    ).subscribe(data => {
      Swal(
        'Əsər redakte edildi!',
        '',
        'success'
      )
      this.progressBar.complete();
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
        this.updateForm.get('city_id').setValue(this.cities[0].id);
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

  onCountryChange(): void {
    let country_id = this.updateForm.get('country_id').value;
    this.getAllCities(country_id);
  }


}
