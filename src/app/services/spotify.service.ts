import { Injectable } from '@angular/core';
import { SearchWrapper } from '../searchbox/searchbox.component';
import { Http, Response } from '@angular/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { Track } from '../models/track.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpotifyService{
  
  searchResultGotten = new Subject<void>();

  readonly API_ADDRESS: string = "http://localhost:5000/spotify/search";
  httpObject: Http;

  searchResults = {"artists":undefined, "albums":undefined, "tracks":undefined};
  subscription;

  constructor(httpObject: Http) {
    this.httpObject = httpObject;
  }

  search(wrapper: SearchWrapper) {
    console.log("Connecting to " + this.API_ADDRESS + wrapper.getUrl());
    this.httpObject.get(this.API_ADDRESS + wrapper.getUrl())
      .map((response: Response) => {
        try{
          return response.json();
        }
        catch(e){
          return response.text();
        }
      })
      .subscribe((json) => {
        try {
          //const parsed = JSON.parse(json);

          let artists:Artist[] = json.artists == undefined ? [] : json.artists;
          let albums:Album[]   = json.albums  == undefined ? [] : json.albums;
          let tracks:Track[]   = json.tracks  == undefined ? [] : json.tracks;

          this.searchResults.artists = artists;
          this.searchResults.albums  = albums;
          this.searchResults.tracks  = tracks;

          this.searchResultGotten.next();
        }
        catch(e){
          console.log("error: " + e);
          console.log(json);
        }
      });
  }
}
