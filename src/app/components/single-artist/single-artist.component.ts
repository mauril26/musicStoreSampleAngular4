import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-single-artist',
  providers: [SpotifyService],
  templateUrl: './single-artist.component.html',
  styleUrls: ['./single-artist.component.css']
})
export class SingleArtistComponent implements OnInit {

  subscription;
  spotifyService : SpotifyService;
  activatedRoute : ActivatedRoute;
  artistData     : Artist = new Artist();
  
  constructor(activatedRoute: ActivatedRoute, spotifyService: SpotifyService) {
    this.activatedRoute = activatedRoute;
    this.spotifyService = spotifyService;
  }

  ngOnInit() {
    this.subscription = this.spotifyService.resultGotten.subscribe(
      ()=>{
        this.artistData = this.spotifyService.searchResults;
        console.log("response updated");
    });   

    this.activatedRoute.params.subscribe(
      (params) => {
        this.spotifyService.getArtist(params.id);
      });
  }

}
