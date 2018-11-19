import { AuthGuard } from './../common/guards/auth.guard';
import { AdminGuard } from './../common/guards/admin.guard';
import { ArtistUpdateComponent } from './artist-update/artist-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ArtistComponent } from './artist/artist.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'artist',
        component: ArtistComponent
      },
      {
        path: 'artist/edit/:id',
        component: ArtistUpdateComponent
      },
      {
        path: 'artworks',
        loadChildren: './artworks/artworks.module#ArtworksModule'
      }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }


