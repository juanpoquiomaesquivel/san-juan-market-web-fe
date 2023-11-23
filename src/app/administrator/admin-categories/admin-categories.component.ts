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

  private keyword: string = '';

  private fetchData() {
    this.isFetching = true;

    this.administratorService.onLoadAllCategories().subscribe(
      (categoryListData) => {
        this.isFetching = false;
        this.categoryList = categoryListData;
        this.isFiltering = true;
        this.filteredCategoryList = this.categoryList.filter((cat) => cat.name.toLowerCase().includes(this.keyword.toLowerCase()));
        this.isFiltering = false;
        this.isEmpty = (this.categoryList.length === 0);
      }
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }

  protected listOfHeaders: string[] = ['#', 'Código', 'Nombre', 'Descripción', 'Acciones'];
  protected listOfWidths = [
    { width: '4%' },
    { width: '10%' },
    { width: '30%' },
    { width: '42%' },
    { width: '14%' }
  ];


  protected editButtonLabel: string = 'Editar';
  protected deleteButtonLabel: string = 'Eliminar';

  p: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page

  // Function to change the page
  onPageChange(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  onSearchInputChangeEvent(keyword: string) {
    this.keyword = keyword;
    this.filteredCategoryList = this.categoryList.filter((cat) => cat.name.toLowerCase().includes(this.keyword.toLowerCase()));
  }

  onUpdateButtonClick() {
    this.fetchData();
  }

  protected onAddButtonClick() {
    const dg = this.matDialog.open(AdminFormAddCategoryComponent, {
      width: '350px',
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != undefined) {
          this.administratorService.onAddCategory(response[0], response[1], response[2]).subscribe(
            (msg) => {
              if (msg.code === 101) {
                this.fetchData();
              }
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
              if (msg.code === 102) {
                this.fetchData();
              }
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
