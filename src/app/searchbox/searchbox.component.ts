import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/Http';
import { SpotifyService } from '../services/spotify.service';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { SearchUpdateService } from '../services/searchUpdate.service';

@Component({
  selector: 'app-searchbox',
  providers: [SpotifyService, SearchUpdateService],
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  searchResults = {"artists":[], "albums":[], "tracks":[]};

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService, private searchUpdateService: SearchUpdateService) {
    this.spotifyService = spotifyService;
  }

  ngOnInit() {
    this.spotifyService.resultGotten.subscribe(
      ()=>{
        this.searchResults = this.spotifyService.searchResults;
    });

    this.activatedRoute.queryParamMap.subscribe(
    (queries)=>{
      this.searchUpdateService.updateSearchBox(queries.get("q"));

      let urlQuery:string = "";

      queries.keys.forEach(element => {
        urlQuery += `${element}=${queries.get(element)}&`;
      });

      if (urlQuery!="")
        this.spotifyService.search(("?" + urlQuery));

    })
  }
}
