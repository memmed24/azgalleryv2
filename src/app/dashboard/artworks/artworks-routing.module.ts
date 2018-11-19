import { ArtworksComponent } from './artworks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: ArtworksComponent,
    children: [
      {
        path: '',
        component: ReadComponent
      },
      {
        path: 'create', 
        component: CreateComponent
      },
      {
        path: 'update/:id', 
        component: UpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworksRoutingModule { }


