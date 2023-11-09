import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/Models/Administrator/category.model';
import { ClassOption } from 'src/app/Models/Administrator/class-option.model';
import { FamilyOptionGroup } from 'src/app/Models/Administrator/family-option-group.model';
import { AdministratorService } from 'src/app/Services/administrator.service';

@Component({
  selector: 'app-admin-form-add-category',
  templateUrl: './admin-form-add-category.component.html',
  styleUrls: ['./admin-form-add-category.component.css']
})
export class AdminFormAddCategoryComponent {

  private familyOptionGroupList: FamilyOptionGroup[];
  private classOptionList: ClassOption[];
  protected filteredClassOptionList: { family: string, classOptionList: ClassOption[] }[];
  protected selectedClassOptionList: ClassOption[] = [];
  protected deletedClassOptionList: ClassOption[] = [];
  protected selectedClassOption: string;
  protected categoryName: string = '';
  protected categoryDescription: string = '';

  protected result() {
    return [
      this.categoryName,
      this.categoryDescription,
      JSON.stringify(this.selectedClassOptionList.map((item) => item.id)),
      JSON.stringify(this.deletedClassOptionList.map((item) => item.id))
    ]
  }

  constructor(@Inject(MAT_DIALOG_DATA) public categoryData: Category, private administratorService: AdministratorService) { }

  ngOnInit() {
    this.administratorService.onLoadFamilyOptionGroupList().subscribe(
      (familyOptionGroupListData) => {
        this.familyOptionGroupList = familyOptionGroupListData;

        this.administratorService.onLoadAvailableClassOptionList().subscribe(
          (classOptionListData) => {
            this.classOptionList = classOptionListData;
            this.filterClassOptionList();
          }
        );
      }
    );

    if (this.categoryData != undefined) {
      this.administratorService.onLoadCurrentClassOptionList(this.categoryData.id).subscribe(
        (data) => {
          this.selectedClassOptionList = data;
        }
      );
      this.categoryName = this.categoryData.name;
      this.categoryDescription = this.categoryData.description;
    }
  }

  private filterClassOptionList() {
    this.filteredClassOptionList = this.familyOptionGroupList.map(
      (entry) => (
        {
          family: entry.name,
          classOptionList: this.classOptionList.filter((classOption) => classOption.familyId === entry.id && this.selectedClassOptionList.find((option) => option.id === classOption.id) === undefined)
        }
      )
    )
  }

  protected onAddClassOptionButtonClick() {
    const value = parseInt(this.selectedClassOption);
    this.selectedClassOptionList.push(this.classOptionList.find((option) => option.id === value));
    this.deletedClassOptionList = this.deletedClassOptionList.filter((item) => item.id != value);
    this.filterClassOptionList();
    this.selectedClassOption = undefined;
  }

  protected onRemoveClassOptionButtonClick(value: number) {
    this.classOptionList.push(this.selectedClassOptionList.find((op) => op.id === value));
    this.deletedClassOptionList.push(this.selectedClassOptionList.find((op) => op.id === value));
    this.selectedClassOptionList = this.selectedClassOptionList.filter((entry) => entry.id != value);
    this.filterClassOptionList();
    this.selectedClassOption = undefined;
  }
}
