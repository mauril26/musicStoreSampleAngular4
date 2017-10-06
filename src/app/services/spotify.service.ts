import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { Track } from '../models/track.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpotifyService{
  
  resultGotten = new Subject<void>();

  readonly API_ADDRESS: string = "http://localhost:5000/spotify/";
  httpObject: Http;

  searchResults = undefined;

  constructor(httpObject: Http) {
    console.log("Spotify Service");
    this.httpObject = httpObject;
  }

  search(query: string) {
    this.searchResults ={
      Artist:new Array[typeof(Artist)](),
      Albums:new Array[typeof(Album)](),
      Tracks:new Array[typeof(Track)]()
    }
    let localUrl: string = this.API_ADDRESS + "search" + query;
    console.log("Querying " + localUrl);

    this.httpObject.get(localUrl)
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

          this.searchResults = {
            Artists : json.artists == undefined ? [] : json.artists,
            Albums  : json.albums  == undefined ? [] : json.albums,
            Tracks  : json.tracks  == undefined ? [] : json.tracks
          };

          this.resultGotten.next();
        }
        catch(e){
          console.log("error: " + e);
          console.log(json);
        }
      });
  }

  getArtist(id: string){
    this.searchResults = new Artist();
    
    let localUrl: string  = this.API_ADDRESS + "artist/" + id;
    console.log("Querying " + localUrl);
    
    this.httpObject.get(localUrl)
    .map((response: Response) => {
      try{
        return response.json();
      }
      catch(e){
        return response.text();
      }
    })
    .subscribe((json) => {
      try{
        this.searchResults.Name       = json.name;
        this.searchResults.Popularity = json.popularity;
        this.searchResults.Genres     = json.genres;
        this.searchResults.Id         = json.id;
        this.searchResults.Images     = json.images;
        this.resultGotten.next();
      }
      catch(e){
        console.log("error: " + e);
        console.log(json);
      }
    });
  }

  getAlbum(id: string){
    this.searchResults = new Album();

    let localUrl: string  = this.API_ADDRESS + "album/" + id;
    console.log("Querying " + localUrl);

    this.httpObject.get(localUrl)
    .map((response: Response) => {
      try{
        return response.json();
      }
      catch(e){
        return response.text();
      }
    })
    .subscribe((json) => {
      try{
        this.searchResults.Name    = json.name;
        this.searchResults.Id      = json.id;
        this.searchResults.Images  = json.images;
        this.searchResults.Artists = json.artists;
        this.resultGotten.next();
      }
      catch(e){
        console.log("error: " + e);
        console.log(json);
      }
    });
  }
}
