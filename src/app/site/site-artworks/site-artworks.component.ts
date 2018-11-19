import { map } from 'rxjs/operators';
import { ArtworkService } from './../../dashboard/artworks/artwork.service';
import { Component, OnInit } from '@angular/core';
import { bounce, fadeIn, fadeOut } from 'ng-animate';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';

@Component({
  selector: 'app-site-artworks',
  templateUrl: './site-artworks.component.html',
  styleUrls: ['./site-artworks.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', useAnimation(fadeIn))
    ]),
    trigger('fadeOut', [
      transition('* => *', useAnimation(fadeOut))
    ]),
    trigger('bounce', [
      transition('* => *', useAnimation(bounce))
    ])
  ]
})
export class SiteArtworksComponent implements OnInit {
  bounce = false;
  query: string;
  take: number = 3;
  skip: number = null;
  artworks: Array<any> = [];
  loadButtonVisibility: boolean = true;
  fadeIn = false;
  fadeOut = false;

  constructor(
    private artworkService: ArtworkService,
  ) { }

  ngOnInit() {
    this.fetchArtworks();
  }

  search(e) {
    this.query = e['query'];
    this.fetchArtworks(this.query);
  }

  loadButtonOnClick(): any {
    this.loadMore();
    this.buttonAnimate('fadeOut');
  }

  buttonAnimate(name: string) {
    this[name] = !this[name];
  }

  loadMore(): any {
    // this.loadButtonVisibility = false;
    this.skip++;
    this.fetchArtworks();
  }

  fetchArtworks(query = null) {
    if (query !== null) {
      this.artworkService.search(query).pipe(
        map(res => {
          return res.json();
        })
      ).subscribe(data => {
        console.log(data);
      })
    } else {
      this.artworkService.arrange(this.take, this.skip ? this.skip : null).getAll().pipe(
        map(res => {
          return res.json();
        })
      ).subscribe(data => {
        data.map((art, i) => {
          this.artworks.push(art);
        });

        this.buttonAnimate('fadeIn');
        
      });
    }
  }

}
