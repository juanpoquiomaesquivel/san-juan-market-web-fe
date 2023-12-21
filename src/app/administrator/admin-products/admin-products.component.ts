import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorService } from 'src/app/Services/administrator.service';
import { AdminFormForProductComponent } from './admin-form-for-product/admin-form-for-product.component';
import { Product } from 'src/app/Models/Administrator/product.model';
import { ProductItem } from 'src/app/Models/Administrator/product-item.model';
import { AdminImagePreviewComponent } from '../admin-image-preview/admin-image-preview.component';
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {

  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private administratorService: AdministratorService) { }

  private productList: ProductItem[];
  protected filteredProductList: ProductItem[];
  protected webPageDataStatus: string = '';

  protected placeholder: string = 'Buscar producto por nombre.';
  protected keyword: string = '';
  protected currentSort: Sort = null;

  private fetchData() {
    this.webPageDataStatus = 'fetching';

    this.administratorService.onLoadAllProducts().subscribe(
      {
        next: (productListData) => {
          this.webPageDataStatus = 'loading';
          this.productList = productListData;
          this.filteredProductList = this.filterProductList(this.keyword, this.currentSort);
        },
        error: () => {
          this.webPageDataStatus = 'error';
        },
        complete: () => {
          this.isBeingModified = 0;
          setTimeout(() => {
            this.webPageDataStatus = this.filteredProductList.length === 0 ? 'empty' : 'data';
          }, 1000);
        }
      }
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }

  protected headerList: any[] = [
    { name: '#', label: '#', styles: { width: '4%' }, disabled: true },
    { name: 'code', label: 'código', styles: { width: '10%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'name', label: 'nombre', styles: { 'min-width': '200px', width: '20%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'description', label: 'descripción', styles: { 'min-width': '250px', width: 'auto', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'image', label: 'imagen', styles: { width: '6%', 'text-transform': 'capitalize' }, disabled: true },
    { name: 'category', label: 'categoría', styles: { 'min-width': '200px', width: '20%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'actions', label: 'acciones', styles: { width: '8%', 'text-transform': 'capitalize' }, disabled: true },
  ];

  protected editButtonLabel: string = 'Editar';
  protected deleteButtonLabel: string = 'Eliminar';

  p: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page

  // Function to change the page
  protected onPageChangeEvent(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  protected onSearchInputChangeEvent(keyword: string) {
    this.keyword = keyword;

    if (this.webPageDataStatus !== 'error') {
      this.filteredProductList = this.filterProductList(this.keyword, this.currentSort);
      this.webPageDataStatus = this.filteredProductList.length === 0 ? 'empty' : 'data';
    }
  }

  protected onSortChangeEvent(sort: Sort) {
    this.currentSort = sort;

    if (this.webPageDataStatus !== 'error') {
      this.filteredProductList = this.filterProductList(this.keyword, this.currentSort);
      this.webPageDataStatus = this.filteredProductList.length === 0 ? 'empty' : 'data';
    }
  }

  private filterProductList(keyword: string, sort: Sort) {
    let aux = this.productList.slice();

    if (sort != null && sort.direction != '') {
      switch (sort.active) {
        case 'code':
          this.placeholder = 'Buscar producto por código.';
          aux = aux.filter((pro) => pro.code.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'description':
          this.placeholder = 'Buscar producto por descripción.';
          aux = aux.filter((pro) => pro.description.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'category':
          this.placeholder = 'Buscar producto por categoría.';
          aux = aux.filter((pro) => pro.category.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'name':
        default:
          this.placeholder = 'Buscar producto por nombre.';
          aux = aux.filter((pro) => pro.name.toLowerCase().includes(keyword.toLowerCase()));
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
            case 'category':
              return compare(a.category, b.category, isAsc);
            default:
              return 0;
          }
        });
    } else {
      this.placeholder = 'Buscar producto por nombre.';
      aux = aux.filter((pro) => pro.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    return aux;
  }

  onUpdateButtonClick() {
    this.fetchData();
  }

  protected onOpenProductImageButtonClick(image: string) {
    this.matDialog.open(AdminImagePreviewComponent, {
      width: '400px',
      data: image
    });
  }

  protected onAddProductButtonClick() {
    const dg = this.matDialog.open(AdminFormForProductComponent, {
      width: '400px',
      disableClose: true
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != undefined) {
          this.administratorService.onAddProduct(response[0], response[1]).subscribe(
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

  protected onEditProductButtonClick(productId: number) {
    this.isBeingModified = productId;
    const obj = this.productList.find((pro) => pro.id === productId);

    const dg = this.matDialog.open(AdminFormForProductComponent, {
      width: '400px',
      data: obj
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != undefined) {
          this.administratorService.onEditProduct(productId, response[0], response[1], response[2]).subscribe(
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
  } // ok

  protected onDeleteProductButtonClick(productId: number) {
    const flag = confirm('Desea eliminar el producto?')

    if (flag) {
      this.administratorService.onDeleteProduct(productId).subscribe(
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