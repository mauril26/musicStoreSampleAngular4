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
  artistData     : Artist = new Artist();
  
  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {

  }

  ngOnInit() {
    this.spotifyService.resultGotten.subscribe(
      ()=>{
        this.artistData = this.spotifyService.searchResults;
        console.log("response updated");
    });   

  this.activatedRoute.paramMap.subscribe(
    (params) => {
        this.spotifyService.getArtist(params.get("id"));
      });
  }
}
