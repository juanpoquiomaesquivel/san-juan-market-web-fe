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
  private productFilterList: ProductFilter[] = [];
  protected filteredProductFilterList: ProductFilter[] = [];

  protected selectedCategoryFilterIdList: number[] = [];
  protected selectedProductFilterIdList: number[] = [];

  ngOnInit(): void {
    this.marketPlaceService.onLoadCategoryFilterList().subscribe(
      (categoryFilterListData) => {
        this.categoryFilterList = categoryFilterListData;
      }
    );
    this.marketPlaceService.onLoadProductFilterList().subscribe(
      (productFilterListData) => {
        this.productFilterList = productFilterListData;
        this.filteredProductFilterList = this.productFilterList;
        this.marketPlaceService.filterCheckboxChange(this.obtain());
      }
    );
  }

  onCategoryFilterCheckboxChange(event: Event) {
    const ckCategoryId = parseInt((<HTMLInputElement>event.target).value);
    const obj = this.selectedCategoryFilterIdList.find(e => e === ckCategoryId);

    if (obj == undefined)
      this.selectedCategoryFilterIdList.push(ckCategoryId);
    else
      this.selectedCategoryFilterIdList = this.selectedCategoryFilterIdList.filter(e => e !== ckCategoryId);

    this.filteredProductFilterList = this.filterProductFilterList();
    console.log('cat, c/', this.filteredProductFilterList)

    this.marketPlaceService.filterCheckboxChange(this.obtain());
  }

  onProductFilterCheckboxChange(event: Event) {
    const ckProductId = parseInt((<HTMLInputElement>event.target).value);
    const obj = this.selectedProductFilterIdList.find(e => e === ckProductId);

    if (obj == undefined)
      this.selectedProductFilterIdList.push(ckProductId);
    else
      this.selectedProductFilterIdList = this.selectedProductFilterIdList.filter(e => e !== ckProductId);

    console.log('pro, c/', this.selectedCategoryFilterIdList)

    this.marketPlaceService.filterCheckboxChange(this.obtain());
  }

  private filterProductFilterList(): ProductFilter[] {
    return this.productFilterList.filter(
      (productFilter) => {
        const obj = this.selectedCategoryFilterIdList.find(e => e === productFilter.categoryFilterId);

        return obj != undefined;
      }
    );
  }

  private obtain(): number[] {
    let ignore = new Set();

    this.selectedProductFilterIdList.forEach(
      spf => {
        const id = this.filteredProductFilterList.find(e => e.id === spf)?.categoryFilterId;
        ignore.add(id);
      }
    );

    const noignore = this.filteredProductFilterList.filter(
      (obj) => !ignore.has(obj.categoryFilterId) || this.selectedProductFilterIdList.includes(obj.id)
    ).map((obj) => { return obj.id });

    return noignore.length !== 0 ? noignore : this.productFilterList.map((obj) => { return obj.id });
  }
}
