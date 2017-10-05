export class Artist{
    Name       : string;
    Popularity : number;
    Genres     : string[];
    Id         : string;
    Images     : JsonImage[];
    TopTracks  : string[];
}

export class JsonImage{
    Width;
    Height;
    Url;
}

export class ArtistLite{
    Name:string;
    Id:string;
}