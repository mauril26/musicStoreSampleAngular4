import { Album } from "./album.model";

export class Track {
    Name: string
    Id: string
    PreviewLink  : string;
    Popularity   : number;
    DurationIsMs : number;
    TracknNumber : number;
    DiscNumber   : number;
    IsExplicit   : boolean;
    Album        : Album;
}