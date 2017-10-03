export class Artist{
    Name       : string;
    Popularity : number;
    Genres     : string[];
    Id         : string;
    Images     : JsonImage[];
}

export class JsonImage{
    width;
    height;
    url;
}

export class ArtistLite{
    Name:string;
    Id:string;
}