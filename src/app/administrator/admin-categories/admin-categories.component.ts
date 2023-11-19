import { Component } from '@angular/core';
import { Category } from '../../Models/Administrator/category.model';
import { DataService } from '../../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminFormAddCategoryComponent } from './admin-form-add-category/admin-form-add-category.component';
import { AdministratorService } from 'src/app/Services/administrator.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent {

  constructor(private matDialog: MatDialog, private administratorService: AdministratorService) { }

  private categoryList: Category[] = [];
  protected filteredCategoryList: Category[] = [];
  protected isFetching: boolean;
  protected isFiltering: boolean;
  protected isEmpty: boolean;

  ngOnInit(): void {
    this.isFetching = true;

    this.administratorService.onLoadAllCategories().subscribe(
      (categoryListData) => {
        this.isFetching = false;
        this.categoryList = categoryListData;
        this.isFiltering = true;
        this.filteredCategoryList = this.categoryList;
        this.isFiltering = false;
        this.isEmpty = (this.categoryList.length === 0);
      }
    );
  }

  protected listOfHeaders: string[] = ['#', 'Código', 'Nombre', 'Descripción', '', ''];
  protected listOfWidths = [
    { width: '4%' },
    { width: '10%' },
    { width: '30%' },
    { width: '42%' },
    { width: '7%' },
    { width: '7%' },
  ];


  protected editButtonLabel: string = 'Editar';
  protected deleteButtonLabel: string = 'Eliminar';

  p: number = 1; // Current page number
  itemsPerPage: number = 5; // Items per page

  // Function to change the page
  onPageChange(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  onSearchButtonClicked(keyword: string) {
    this.filteredCategoryList = this.categoryList.filter((cat) => cat.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  protected onAddButtonClick() {
    const dg = this.matDialog.open(AdminFormAddCategoryComponent, {
      width: '350px',
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onAddCategory(response[0], response[1], response[2]).subscribe(
            (msg) => {
              console.log(msg);
            }
          );
        }
      }
    );
  }

  protected onEditCategoryButtonClick(categoryId: number) {

    const obj = this.categoryList.find((cat) => cat.id === categoryId);

    const dg = this.matDialog.open(AdminFormAddCategoryComponent, {
      width: '350px',
      data: obj
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onEditCategory(categoryId, response[0], response[1], response[2], response[3]).subscribe(
            (msg) => {
              console.log(msg);
            }
          );
        }
      }
    );
  }

  protected onDeleteCategoryButtonClick(categoryId: number) {
    const flag = confirm('Desea eliminar la categoria?')

    if (flag) {
      this.administratorService.onDeleteCategory(categoryId).subscribe(
        (msg) => {
          console.log(msg)
        }
      );
    }
  }
}
