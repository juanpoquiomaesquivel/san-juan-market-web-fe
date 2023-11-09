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

  constructor(private matDialog: MatDialog, private dataService: DataService, private administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.dataService.loadAllCategories().subscribe(
      response => {
        this.listOfCategories = response;
      }
    );
  }

  protected getCategoriesByName(name: string) {
    this.dataService.loadCategoriesContainingName(name).subscribe(
      response => {
        this.listOfCategories = response;
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

  listOfCategories: Category[] = [];

  p: number = 1; // Current page number
  itemsPerPage: number = 5; // Items per page

  // Function to change the page
  onPageChange(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  onSearchButtonClicked(data: string) {
    this.getCategoriesByName(data);
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

    const obj = this.listOfCategories.find((cat) => cat.id === categoryId);

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
