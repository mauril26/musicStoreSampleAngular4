import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album.model';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-album',
  providers: [SpotifyService],
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.css']
})
export class SingleAlbumComponent implements OnInit {

  subscription;
  spotifyService : SpotifyService;
  activatedRoute : ActivatedRoute;
  albumData      : Album = new Album();
  
  constructor(activatedRoute: ActivatedRoute, spotifyService: SpotifyService) { 
    this.activatedRoute = activatedRoute;
    this.spotifyService = spotifyService;
  }

  ngOnInit() {
    this.subscription = this.spotifyService.resultGotten.subscribe(
      ()=>{
        this.albumData = this.spotifyService.searchResults;
        console.log(this.albumData);
        console.log("response updated");
    });

    this.activatedRoute.params.subscribe(
      (params) => {
        this.spotifyService.getAlbum(params.id);
      });
  }

}
