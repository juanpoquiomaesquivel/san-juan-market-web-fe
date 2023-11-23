import { Component } from '@angular/core';
import { MarketPlaceService } from 'src/app/Services/market-place.service';

@Component({
  selector: 'app-mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.css']
})
export class MpSearchComponent {

  protected searchLabelPlaceholder = 'Buscar articulos';

  protected keyword: string = '';

  constructor(private marketPlaceService: MarketPlaceService) { }

  ngOnInit() {

  }

  protected cleanKeyword() {
    this.keyword = '';
    this.marketPlaceService.searchFilterButton(this.keyword);
  }

  onKeyboardPressed() {
    this.marketPlaceService.searchFilterButton(this.keyword);
  }
}
