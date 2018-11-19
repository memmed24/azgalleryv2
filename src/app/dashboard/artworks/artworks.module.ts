import { ReactiveFormsModule } from '@angular/forms';
import { ArtworksComponent } from './artworks.component';
import { ArtworksRoutingModule } from './artworks-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    ArtworksRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ArtworksComponent, CreateComponent, ReadComponent, UpdateComponent]
})
export class ArtworksModule { }