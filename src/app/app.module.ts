import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SearchboxComponent } from './searchbox/searchbox.component';
import { CartComponent } from './components/cart/cart.component';

import { SingleArtistComponent } from './components/single-artist/single-artist.component';
import { SingleAlbumComponent } from './components/single-album/single-album.component';

import { ArtistListItemComponent } from './components/artist-list-item/artist-list-item.component';
import { AlbumListItemComponent } from './components/album-list-item/album-list-item.component';
import { TrackListItemComponent } from './components/track-list-item/track-list-item.component';

const routes = [
  { path: 'search', component:  SearchboxComponent },
  { path: 'artist', component:  SingleArtistComponent },
  { path: 'album',  component:  SingleAlbumComponent },
  { path: 'cart',   component:  CartComponent },
  { path: '**',     redirectTo: '/search' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchboxComponent,
    SingleArtistComponent,
    ArtistListItemComponent,
    SingleAlbumComponent,
    CartComponent,
    AlbumListItemComponent,
    TrackListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
