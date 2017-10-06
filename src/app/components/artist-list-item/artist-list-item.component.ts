import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-list-item',
  templateUrl: './artist-list-item.component.html',
  styleUrls: ['./artist-list-item.component.css']
})
export class ArtistListItemComponent implements OnInit {
  @Input()
  artist;

  currentArtist: Artist = new Artist();

  constructor() {

  }

  ngOnInit() {
    Object.assign(this.currentArtist, this.artist)
  }

}
