import { Component, OnInit } from '@angular/core';
import { CategoryFilter } from '../../Models/Market Place/category-filter.model';
import { ProductFilter } from '../../Models/Market Place/product-filter.model';
import { MarketPlaceService } from 'src/app/Services/market-place.service';

@Component({
  selector: 'app-mp-filters',
  templateUrl: './mp-filters.component.html',
  styleUrls: ['./mp-filters.component.css']
})
export class MpFiltersComponent implements OnInit {

  constructor(private marketPlaceService: MarketPlaceService) { }

  protected categoryFilterList: CategoryFilter[] = [];
  protected productFilterList: ProductFilter[] = [];
  protected filteredProductFilterList: ProductFilter[] = [];

  protected selectedCategoryFilterId: number = 0;
  protected selectedProductFilterId: number = 0;

  ngOnInit(): void {
    this.marketPlaceService.OnLoadCategoryFilterList().subscribe((data) => {
      this.categoryFilterList = data;
    });
    this.marketPlaceService.OnLoadProductFilterList().subscribe((data) => {
      this.productFilterList = data;
      this.filteredProductFilterList = this.productFilterList;
    });
  }

  onCategoryFilterSelectChange() {
    this.filteredProductFilterList = this.filterProductFilterList(this.selectedCategoryFilterId);
    this.marketPlaceService.categoryFilterSelect(this.selectedCategoryFilterId);
    this.selectedProductFilterId = 0;
    this.marketPlaceService.productFilterSelect(this.selectedProductFilterId);
  }

  onProductFilterSelectChange() {
    this.marketPlaceService.productFilterSelect(this.selectedProductFilterId);
  }

  private filterProductFilterList(categoryFilterId: number): ProductFilter[] {
    if (categoryFilterId == 0) {
      return [];
    }

    return this.productFilterList.filter((productFilter) => productFilter.categoryFilterId == categoryFilterId);
  }
}
