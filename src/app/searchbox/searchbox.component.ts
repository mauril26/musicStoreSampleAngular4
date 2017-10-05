import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/Http';
import { SpotifyService } from '../services/spotify.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-searchbox',
  providers: [SpotifyService],
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  spotifyService: SpotifyService;
  subscription;
  searchResults = {"artists":[], "albums":[], "tracks":[]};

  constructor(spotifyService: SpotifyService) {
    this.spotifyService = spotifyService;
  }

  ngOnInit() {
      this.subscription = this.spotifyService.resultGotten.subscribe(
        ()=>{
          this.searchResults = this.spotifyService.searchResults;
          console.log(this.searchResults);
          console.log("response updated");
      });    
  }

  onSearchSubmit(searchForm){
    let wrapper: SearchWrapper = new SearchWrapper();
    wrapper.query  = searchForm.value.query;
    wrapper.artist = searchForm.value.artist;
    wrapper.album  = searchForm.value.album;
    wrapper.track  = searchForm.value.track;
    
    try{
      this.spotifyService.search(wrapper);
    }
    catch(e){
      console.log(e);
    }
  }
}

export class SearchWrapper {
  _query  : string;
  _artist : string;
  _album  : string;
  _track  : string;

  set query(newValue: string) {
    this._query = newValue;
  }

  set artist(newValue: string) {
    this._artist = newValue;
  }

  set album(newValue: string) {
    this._album = newValue;
  }

  set track(newValue: string) {
    this._track = newValue;
  }

  getUrl() : string {
    let filter : string[] = [];

    if (this._artist != "")
      filter.push("artist");

    if (this._album != "")
      filter.push("album");
    
    if (this._track != "")
      filter.push("track");

    if (this._artist == "" && this._album == "" && this._track == "")
      filter = ["artist", "album", "track"];

    return `?q=${this._query}&type=${filter.join(",")}`;
  }
}
