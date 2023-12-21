import { Component } from '@angular/core';
import { Category } from '../../Models/Administrator/category.model';
import { DataService } from '../../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminFormAddCategoryComponent } from './admin-form-add-category/admin-form-add-category.component';
import { AdministratorService } from 'src/app/Services/administrator.service';
import { CategoryItem } from 'src/app/Models/Administrator/category-item.model';
import { AdminImagePreviewComponent } from '../admin-image-preview/admin-image-preview.component';
import { Sort } from '@angular/material/sort'
import { timeout } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent {

  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private administratorService: AdministratorService) { }

  private categoryList: CategoryItem[] = [];
  protected filteredCategoryList: CategoryItem[] = [];
  protected webPageDataStatus: string = '';

  protected placeholder: string = 'Buscar categoría por nombre.';
  private keyword: string = '';
  protected currentSort: Sort = null;

  private fetchData() {
    this.webPageDataStatus = 'fetching';

    this.administratorService.onLoadAllCategories().subscribe(
      {
        next: (categoryListData) => {
          this.webPageDataStatus = 'loading';
          this.categoryList = categoryListData;
          this.filteredCategoryList = this.filterCategoryList(this.keyword, this.currentSort);
        },
        error: () => {
          this.webPageDataStatus = 'error';
        },
        complete: () => {
          this.isBeingModified = 0;
          setTimeout(() => {
            this.webPageDataStatus = this.filteredCategoryList.length === 0 ? 'empty' : 'data';
          }, 1000);
        }
      }
    );

    this.p = 1;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  protected headerList: any[] = [
    { name: '#', label: '#', styles: { width: '4%' }, disabled: true },
    { name: 'code', label: 'código', styles: { width: '10%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'name', label: 'nombre', styles: { width: '25%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'description', label: 'descripción', styles: { width: 'auto', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'image', label: 'imagen', styles: { width: '6%', 'text-transform': 'capitalize' }, disabled: true },
    { name: 'actions', label: 'acciones', styles: { width: '8%', 'text-transform': 'capitalize' }, disabled: true },
  ];

  protected p: number = 1; // Current page number
  protected itemsPerPage: number = 10; // Items per page

  protected onPageChangeEvent(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  protected onSearchInputChangeEvent(keyword: string): void {
    this.keyword = keyword;

    if (this.webPageDataStatus !== 'error') {
      this.filteredCategoryList = this.filterCategoryList(this.keyword, this.currentSort);
      this.webPageDataStatus = this.filteredCategoryList.length === 0 ? 'empty' : 'data';
    }
  }

  protected onSortChangeEvent(sort: Sort) {
    this.currentSort = sort;

    if (this.webPageDataStatus !== 'error') {
      this.filteredCategoryList = this.filterCategoryList(this.keyword, this.currentSort);
      this.webPageDataStatus = this.filteredCategoryList.length === 0 ? 'empty' : 'data';
    }
  }

  private filterCategoryList(keyword: string, sort: Sort) {
    let aux = this.categoryList.slice();

    if (sort != null && sort.direction != '') {
      switch (sort.active) {
        case 'code':
          this.placeholder = 'Buscar categoría por código.';
          aux = aux.filter((cat) => cat.code.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'description':
          this.placeholder = 'Buscar categoría por descripción.';
          aux = aux.filter((cat) => cat.description.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'name':
        default:
          this.placeholder = 'Buscar categoría por nombre.';
          aux = aux.filter((cat) => cat.name.toLowerCase().includes(keyword.toLowerCase()));
      }

      aux.sort(
        (a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'code':
              return compare(a.code, b.code, isAsc);
            case 'name':
              return compare(a.name, b.name, isAsc);
            case 'description':
              return compare(a.description, b.description, isAsc);
            default:
              return 0;
          }
        });
    } else {
      this.placeholder = 'Buscar categoría por nombre.';
      aux = aux.filter((cat) => cat.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    return aux;
  }

  protected onUpdateButtonClick(): void {
    this.fetchData();
  }

  protected onOpenCategoryImageButtonClick(image: string): void {
    this.matDialog.open(AdminImagePreviewComponent, {
      width: '400px',
      data: image
    });
  }

  protected onAddButtonClick() {
    const dg = this.matDialog.open(AdminFormAddCategoryComponent, {
      width: '400px',
      disableClose: true
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != undefined) {
          this.administratorService.onAddCategory(response[0], response[1]).subscribe(
            (msg) => {
              if (msg.code === 101) {
                this.fetchData();
                this.matSnackBar.open(msg.description, '', { duration: 4000 });
              }
            }
          );
        }
      }
    );
  }

  protected isBeingModified: number = 0;

  protected onEditCategoryButtonClick(categoryId: number) {
    this.isBeingModified = categoryId;
    const obj = this.categoryList.find((cat) => cat.id === categoryId);

    const dg = this.matDialog.open(AdminFormAddCategoryComponent, {
      width: '400px',
      data: obj,
      disableClose: true,
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != undefined) {
          this.administratorService.onEditCategory(categoryId, response[0], response[1], response[2]).subscribe(
            (msg) => {
              if (msg.code === 102) {
                this.fetchData();
                this.matSnackBar.open(msg.description, '', { duration: 4000 });
              }
            }
          );
        } else {
          this.isBeingModified = 0;
        }
      }
    );
  }

  protected onDeleteCategoryButtonClick(categoryId: number) {
    this.isBeingModified = categoryId;
    const flag = confirm('¿Desea eliminar la categoría?')

    if (flag) {
      this.administratorService.onDeleteCategory(categoryId).subscribe(
        (msg) => {
          if (msg.code === 103) {
            this.fetchData();
            this.matSnackBar.open(msg.description, '', { duration: 4000 });
          }
        }
      );
    } else
      this.isBeingModified = 0;
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}