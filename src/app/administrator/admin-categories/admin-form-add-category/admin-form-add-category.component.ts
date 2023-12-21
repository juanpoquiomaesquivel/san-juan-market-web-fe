import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/Models/Administrator/category.model';
import { ClassOption } from 'src/app/Models/Administrator/class-option.model';
import { FamilyOptionGroup } from 'src/app/Models/Administrator/family-option-group.model';
import { AdministratorService } from 'src/app/Services/administrator.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryItem } from 'src/app/Models/Administrator/category-item.model';

@Component({
  selector: 'app-admin-form-add-category',
  templateUrl: './admin-form-add-category.component.html',
  styleUrls: ['./admin-form-add-category.component.css']
})
export class AdminFormAddCategoryComponent {

  protected categoryFormTitle = "nueva categoria";
  protected categoryFormSaveButtonTitle = "agregar";

  private familyOptionGroupList: FamilyOptionGroup[] = [];
  private classOptionList: ClassOption[] = [];
  private unavailableClassOptionList: ClassOption[] = [];
  protected filteredClassOptionList: { family: string, classOptionList: ClassOption[] }[] = [];
  protected selectedClassOptionList: number[] = [];
  protected deletedClassOptionList: number[] = [];

  private categoryName: string = '';
  private categoryDescription: string = '';
  private categoryImage: string = '';

  protected categoryForm: FormGroup;

  protected getClassOptionName(id: number) {
    return this.classOptionList.find((co) => co.id === id)?.name;
  }

  protected getUnavailableClassOptionName(id: number) {
    const name = this.unavailableClassOptionList.find((obj) => obj.id === id)?.name;
    return name == undefined ? "" : "[" + name + "] ";
  }

  constructor(private matDialogRef: MatDialogRef<AdminFormAddCategoryComponent>, @Inject(MAT_DIALOG_DATA) public categoryData: CategoryItem, private administratorService: AdministratorService) { }

  protected isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
    this.administratorService.onLoadUnavailableClassOptionList().subscribe(
      {
        next: (unavailableClassOptionListData) => {
          this.unavailableClassOptionList = unavailableClassOptionListData;
        }
      }
    );

    this.administratorService.onLoadFamilyOptionGroupList().subscribe(
      {
        next: (familyOptionGroupListData) => {
          this.familyOptionGroupList = familyOptionGroupListData;
        },
        complete: () => {
          this.administratorService.onLoadAvailableClassOptionList().subscribe(
            {
              next: (classOptionListData) => {
                this.classOptionList = classOptionListData;
              },
              complete: () => this.filterClassOptionList()
            }
          );
        }
      }
    );

    if (this.categoryData != undefined) {
      this.categoryFormTitle = "editar categoria";
      this.categoryFormSaveButtonTitle = "guardar";
      this.categoryName = this.categoryData.name;
      this.categoryDescription = this.categoryData.description;
      this.categoryImage = this.categoryData.image;

      this.administratorService.onLoadCurrentClassOptionList(this.categoryData.id).subscribe(
        {
          next: (selectedClassOptionListData) => {
            this.selectedClassOptionList = selectedClassOptionListData;
          },
          complete: () => {
            this.categoryForm = new FormGroup(
              {
                tags: new FormControl(0, []),
                name: new FormControl(this.categoryName, [Validators.required]),
                description: new FormControl(this.categoryDescription, []),
                image: new FormControl(this.categoryImage, [])
              }
            );
          }
        }
      );
    } else {
      this.categoryForm = new FormGroup(
        {
          tags: new FormControl(0, []),
          name: new FormControl(this.categoryName, [Validators.required]),
          description: new FormControl(this.categoryDescription, []),
          image: new FormControl(this.categoryImage, [])
        }
      );
    }

    /* forkJoin([req1, req2])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(
        ([familyOptionGroupListData, classOptionListData]) => {
          this.familyOptionGroupList = familyOptionGroupListData;
          this.classOptionList = classOptionListData;
          this.filterClassOptionList();
          this.isLoading = false;
        }
      ); */



    /* this.categoryForm.statusChanges.subscribe((status) => {
      console.log(status)
    }); */
  }

  OnFormSubmitted() {
    //console.log(this.categoryForm.value);
    this.matDialogRef.close(
      [
        {
          name: this.categoryForm.get('name').value,
          description: this.categoryForm.get('description').value,
          image: this.categoryForm.get('image').value
        },
        JSON.stringify(this.selectedClassOptionList),
        JSON.stringify(this.deletedClassOptionList)
      ]
    );
  }

  private filterClassOptionList() {
    this.filteredClassOptionList = this.familyOptionGroupList.map(
      (entry) => (
        {
          family: entry.name,
          classOptionList: this.classOptionList.filter((classOption) => classOption.familyId === entry.id)
        }
      )
    )
  }

  protected onAddClassOptionButtonClick() {
    const value = parseInt(this.categoryForm.get('tags').value);
    this.selectedClassOptionList.push(this.classOptionList.find((option) => option.id === value)?.id);
    this.deletedClassOptionList = this.deletedClassOptionList.filter((id) => id !== value);
    this.filterClassOptionList();
    this.categoryForm.get('tags').setValue(0);
  }

  protected onRemoveClassOptionButtonClick(value: number) {
    this.deletedClassOptionList.push(this.selectedClassOptionList.find((id) => id === value));
    this.selectedClassOptionList = this.selectedClassOptionList.filter((entry) => entry !== value);
    this.filterClassOptionList();
  }
}
