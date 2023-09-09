import { Component } from '@angular/core';
import { Category } from '../category.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-market-place-filters',
  templateUrl: './market-place-filters.component.html',
  styleUrls: ['./market-place-filters.component.css']
})
export class MarketPlaceFiltersComponent {

  listOfCategories: Category[] = [{ code: 'america', name: 'ac', description: 'ad' }];

  listOfProducts: Product[] = [{ code: 'codito', name: 'adf', description: '', categoryCode: 'AAA1' }]
}
