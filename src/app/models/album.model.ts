import { ArtistLite } from "./artist.model";

export class Album {
    Name:string;
    Id:string;
    Images:JsonImage[];
    ArtistsId:ArtistLite[];
}

export class JsonImage{
    width;
    height;
    url;
}