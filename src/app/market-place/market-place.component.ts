import { Component } from '@angular/core';
import { MarketPlaceService } from '../Services/market-place.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css'],
  providers: [MarketPlaceService]
})
export class MarketPlaceComponent {

}
