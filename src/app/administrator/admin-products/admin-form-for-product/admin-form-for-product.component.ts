import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryOption } from 'src/app/Models/Administrator/category-option.model';
import { ClassOptionGroup } from 'src/app/Models/Administrator/class-option-group.model';
import { CommodityOption } from 'src/app/Models/Administrator/commodity-option.model';
import { ProductItem } from 'src/app/Models/Administrator/product-item.model';
import { Product } from 'src/app/Models/Administrator/product.model';
import { AdministratorService } from 'src/app/Services/administrator.service';

@Component({
  selector: 'app-admin-form-for-product',
  templateUrl: './admin-form-for-product.component.html',
  styleUrls: ['./admin-form-for-product.component.css']
})
export class AdminFormForProductComponent {

  protected productFormTitle = "nuevo producto";
  protected productFormSaveButtonTitle = "agregar";

  protected categoryOptionList: CategoryOption[] = [];
  private classOptionGroupList: ClassOptionGroup[] = [];
  private commodityOptionList: CommodityOption[] = [];
  private unavailableCommodityOptionList: CommodityOption[] = [];
  protected filteredCommodityOptionList: { class: string, commodityOptionList: CommodityOption[] }[];
  protected selectedCommodityOptionList: number[] = [];
  protected deletedCommodityOptionList: number[] = [];

  private productName: string = '';
  private productDescription: string = '';
  private productImage: string = '';

  protected productForm: FormGroup;

  protected getCommodityOptionName(id: number) {
    return this.commodityOptionList.find((co) => co.id === id)?.name;
  }

  protected getUnavailableCommodityOptionName(id: number) {
    const name = this.unavailableCommodityOptionList.find((obj) => obj.id === id)?.name;
    return name == undefined ? "" : "[" + name + "] ";
  }

  constructor(private matDialogRef: MatDialogRef<AdminFormForProductComponent>, @Inject(MAT_DIALOG_DATA) public productData: ProductItem, private administratorService: AdministratorService) { }

  protected isLoading: boolean;

  private fetchData(categoryOptionId: number) {
    this.administratorService.onLoadClassOptionGroupList(categoryOptionId).subscribe(
      {
        next: (classOptionGroupListData) => {
          this.classOptionGroupList = classOptionGroupListData;
          const classIdArray = JSON.stringify(this.classOptionGroupList.map((item) => item.id));


          this.administratorService.onLoadUnavailableCommodityOptionList(classIdArray).subscribe(
            {
              next: (unavailableCommodityOptionListData) => {
                this.unavailableCommodityOptionList = unavailableCommodityOptionListData;
              }
            }
          );

          this.administratorService.onLoadAvailableCommodityOptionList(classIdArray).subscribe(
            {
              next: (commodityOptionListData) => {
                this.commodityOptionList = commodityOptionListData;
              },
              complete: () => this.filterCommodityOptionList()
            }
          );
        }
      }
    );
  }


  ngOnInit() {
    // this load unavailable commodity

    this.administratorService.onLoadCategoryOptionList().subscribe(
      {
        next: (categoryOptionListData) => {
          this.categoryOptionList = categoryOptionListData;
        }
      }
    );

    if (this.productData != undefined) {
      this.productFormTitle = "editar producto";
      this.productFormSaveButtonTitle = "guardar";
      this.productName = this.productData.name;
      this.productDescription = this.productData.description;
      this.productImage = this.productData.image;

      this.administratorService.onLoadCategoryIdOfProduct(this.productData.id).subscribe(
        {
          next: (categoryId) => {
            this.fetchData(categoryId);

            this.administratorService.onLoadCurrentCommodityOptionList(this.productData.id).subscribe(
              {
                next: (selectedCommodityOptionListData) => {
                  this.selectedCommodityOptionList = selectedCommodityOptionListData;
                },
                complete: () => {
                  this.productForm = new FormGroup(
                    {
                      category: new FormControl(categoryId, [Validators.required]),
                      tags: new FormControl(0, []),
                      name: new FormControl(this.productName, [Validators.required]),
                      description: new FormControl(this.productDescription, []),
                      image: new FormControl(this.productImage, [])
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      this.fetchData(1);
      this.productForm = new FormGroup(
        {
          category: new FormControl(1, [Validators.required]),
          tags: new FormControl(0, []),
          name: new FormControl(this.productName, [Validators.required]),
          description: new FormControl(this.productDescription, []),
          image: new FormControl(this.productImage, [])
        }
      );
    }
  }

  OnFormSubmitted() {
    this.matDialogRef.close(
      [
        {
          name: this.productForm.get('name').value,
          description: this.productForm.get('description').value,
          image: this.productForm.get('image').value,
          category: this.productForm.get('category').value,
        },
        JSON.stringify(this.selectedCommodityOptionList),
        JSON.stringify(this.deletedCommodityOptionList)
      ]
    );
  }

  private cont = 0;

  onCategoryOptionSelectChange(e: Event) {
    const id = parseInt((<HTMLSelectElement>e.target).value);

    this.selectedCommodityOptionList.forEach(e => {
      this.deletedCommodityOptionList.push(e);
    });
    this.selectedCommodityOptionList = [];

    this.fetchData(id);
  }

  private filterCommodityOptionList() {
    this.filteredCommodityOptionList = this.classOptionGroupList.map(
      (entry) => (
        {
          class: entry.name,
          commodityOptionList: this.commodityOptionList.filter((commodityOption) => commodityOption.classId === entry.id)
        }
      )
    );
  }

  protected onAddCommodityOptionButtonClick() {
    const value = parseInt(this.productForm.get('tags').value);
    this.selectedCommodityOptionList.push(this.commodityOptionList.find((option) => option.id === value)?.id);
    this.deletedCommodityOptionList = this.deletedCommodityOptionList.filter((item) => item !== value);
    this.filterCommodityOptionList();
    this.productForm.get('tags').setValue(0);
  }

  protected onRemoveCommodityOptionButtonClick(value: number) {
    this.deletedCommodityOptionList.push(this.selectedCommodityOptionList.find((op) => op === value));
    this.selectedCommodityOptionList = this.selectedCommodityOptionList.filter((entry) => entry !== value);
    console.log("removing");
    console.log(this.selectedCommodityOptionList);
    this.filterCommodityOptionList();
  }
}
