import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryOption } from 'src/app/Models/Administrator/category-option.model';
import { ClassOptionGroup } from 'src/app/Models/Administrator/class-option-group.model';
import { CommodityOption } from 'src/app/Models/Administrator/commodity-option.model';
import { Product } from 'src/app/Models/product.model';
import { AdministratorService } from 'src/app/Services/administrator.service';

@Component({
  selector: 'app-admin-form-for-product',
  templateUrl: './admin-form-for-product.component.html',
  styleUrls: ['./admin-form-for-product.component.css']
})
export class AdminFormForProductComponent {

  protected categoryOptionList: CategoryOption[];
  protected selectedCategoryOptionId: number = 0;

  private classOptionGroupList: ClassOptionGroup[] = [];
  private commodityOptionList: CommodityOption[];
  protected filteredCommodityOptionList: { class: string, commodityOptionList: CommodityOption[] }[];
  protected selectedCommodityOptionList: CommodityOption[] = [];
  protected deletedCommodityOptionList: CommodityOption[] = [];
  protected selectedCommodityOption: string;
  protected productName: string = '';
  protected productDescription: string = '';

  private fetching(categoryOptionId: number) {
    this.administratorService.onLoadClassOptionGroupList(categoryOptionId).subscribe(
      (dataClassOptionGroupList) => {
        this.classOptionGroupList = dataClassOptionGroupList;
        const classIdArray = JSON.stringify(this.classOptionGroupList.map((item) => item.id));

        this.administratorService.onLoadAvailableCommodityOptionList(classIdArray).subscribe(
          (dataCommodityOptionList) => {
            console.log(dataCommodityOptionList)
            this.commodityOptionList = dataCommodityOptionList;
            this.filteredCommodityOptionList = this.filterCommodityOptionList();
          }
        );
      }
    );
  }

  protected onCategoryOptionSelectChange(event: Event) {
    this.selectedCategoryOptionId = parseInt((<HTMLSelectElement>event.target).value);
    this.fetching(this.selectedCategoryOptionId);
  }

  private filterCommodityOptionList() {
    return this.classOptionGroupList.map(
      (entry) => (
        {
          class: entry.name,
          commodityOptionList: this.commodityOptionList.filter(
            (commodityOption) => commodityOption.classId === entry.id && this.selectedCommodityOptionList.find((option) => option.id === commodityOption.id) === undefined
          )
        }
      )
    );
  }

  protected result() {
    return [
      this.productName,
      this.productDescription,
      this.selectedCategoryOptionId,
      JSON.stringify(this.selectedCommodityOptionList.map((item) => item.id)),
      JSON.stringify(this.deletedCommodityOptionList.map((item) => item.id))
    ]
  }

  constructor(@Inject(MAT_DIALOG_DATA) public productData: Product, private administratorService: AdministratorService) { }

  ngOnInit() {
    if (this.productData != undefined) {
      this.productName = this.productData.name;
      this.productDescription = this.productData.description;
      this.selectedCategoryOptionId = this.productData.categoryId;
      this.administratorService.onLoadCurrentCommodityOptionList(this.productData.id).subscribe(
        (data) => {
          this.selectedCommodityOptionList = data;
        }
      );
    }

    this.administratorService.onLoadCategoryOptionList().subscribe(
      (dataCategoryOptionList) => {
        this.categoryOptionList = dataCategoryOptionList;
        this.selectedCategoryOptionId = this.selectedCategoryOptionId === 0 ? this.categoryOptionList.at(0).id : this.selectedCategoryOptionId;

        this.fetching(this.selectedCategoryOptionId);
      }
    );
  }

  protected onAddCommodityOptionButtonClick() {
    const value = parseInt(this.selectedCommodityOption);
    this.selectedCommodityOptionList.push(this.commodityOptionList.find((option) => option.id === value));
    this.deletedCommodityOptionList = this.deletedCommodityOptionList.filter((item) => item.id != value);
    this.filteredCommodityOptionList = this.filterCommodityOptionList();
    this.selectedCommodityOption = undefined;
  }

  protected onRemoveCommodityOptionButtonClick(value: number) {
    this.commodityOptionList.push(this.selectedCommodityOptionList.find((op) => op.id === value));
    this.deletedCommodityOptionList.push(this.selectedCommodityOptionList.find((op) => op.id === value));
    this.selectedCommodityOptionList = this.selectedCommodityOptionList.filter((entry) => entry.id != value);
    this.filteredCommodityOptionList = this.filterCommodityOptionList();
    this.selectedCommodityOption = undefined;
  }
}
