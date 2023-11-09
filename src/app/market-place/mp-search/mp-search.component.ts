import { Component } from '@angular/core';
import { MarketPlaceService } from 'src/app/Services/market-place.service';

@Component({
  selector: 'app-mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.css']
})
export class MpSearchComponent {

  searchLabelPlaceholder = 'Encuentra lo que necesitas... :)'

  protected keyword: string = '';

  constructor(private marketPlaceService: MarketPlaceService) {}

  ngOnInit() {

  }

  onSearchFilterButtonClick() {
    this.marketPlaceService.searchFilterButton(this.keyword);
  }
}
