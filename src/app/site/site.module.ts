import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { SiteArtworksComponent } from './site-artworks/site-artworks.component';
import { SiteSearchComponent } from './shared/site-search/site-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  declarations: [SiteComponent, HomeComponent, HeaderComponent, SiteArtworksComponent, SiteSearchComponent]
})
export class SiteModule { }
