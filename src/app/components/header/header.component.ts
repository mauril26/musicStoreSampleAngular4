import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchUpdateService } from '../../services/searchUpdate.service';

@Component({
  selector: 'app-header',
  providers: [SearchUpdateService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm: string = "";
  constructor(private router: Router, private route: ActivatedRoute, private searchUpdateService: SearchUpdateService) {

  }

  ngOnInit(): void {
    this.searchUpdateService.searchBoxChanged.subscribe(
      (text) => {
        this.searchTerm = text;
      });
  }

  onSearchSubmit(searchForm) {
    try {
      let queryType = [];

      if (searchForm.value.artist != "")
        queryType.push("artist");

      if (searchForm.value.album != "")
        queryType.push("album");

      if (searchForm.value.track != "")
        queryType.push("track");

      if (searchForm.value.artist == "" && searchForm.value.album == "" && searchForm.value.track == "")
        queryType = ["artist", "album", "track"];


      this.router.navigate(['/search'], {
        queryParams: {
          q: searchForm.value.query,
          type: queryType.join()
        }
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
