import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { Track } from '../models/track.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchUpdateService {
    searchBoxChanged = new Subject<string>();

    updateSearchBox(text: string) {
        this.searchBoxChanged.next(text);
    }
}