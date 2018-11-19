import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ArtistComponent } from './artist/artist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistUpdateComponent } from './artist-update/artist-update.component';
import { IndexComponent } from './index/index.component';
import { CountriesComponent } from './index/countries/countries.component';
import { CitiesComponent } from './index/cities/cities.component';
import { CategoriesComponent } from './index/categories/categories.component';
import { MaterialsComponent } from './index/materials/materials.component';
import { FondsComponent } from './index/fonds/fonds.component';
import { ContracttypesComponent } from './index/contracttypes/contracttypes.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    
  ],
  declarations: [DashboardComponent, ArtistComponent, NavbarComponent, ArtistUpdateComponent, IndexComponent, CountriesComponent, CitiesComponent, CategoriesComponent, MaterialsComponent, FondsComponent, ContracttypesComponent]
})
export class DashboardModule { }