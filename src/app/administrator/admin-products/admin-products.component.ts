import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/Models/Administrator/category.model';
import { AdministratorService } from 'src/app/Services/administrator.service';
import { DataService } from 'src/app/Services/data.service';
import { AdminFormForProductComponent } from './admin-form-for-product/admin-form-for-product.component';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {

  constructor(private matDialog: MatDialog, private administratorService: AdministratorService) { }

  private productList: Product[];
  protected filteredProductList: Product[];

  private fetchData() {
    this.administratorService.onLoadAllProducts().subscribe(
      (allProducts) => {
        this.productList = allProducts;
        this.filteredProductList = this.productList.filter((p) => p.name.toLowerCase().includes(this.keyword.toLowerCase()));
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
    { width: '14%' }];

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

  protected keyword: string = '';

  onSearchInputChangeEvent(keyword: string) {
    this.keyword = keyword;
    this.filteredProductList = this.productList.filter((p) => p.name.toLowerCase().includes(this.keyword.toLowerCase()));
  }

  onUpdateButtonClick() {
    this.fetchData();
  }

  protected onAddProductButtonClick() {
    const dg = this.matDialog.open(AdminFormForProductComponent, {
      width: '350px',
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onAddProduct(response[0], response[1], response[2], response[3]).subscribe(
            (msg) => {
              console.log(msg);
            }
          );
        }
      }
    );
  }

  protected onEditProductButtonClick(productId: number) {
    const obj = this.productList.find((pro) => pro.id === productId);

    const dg = this.matDialog.open(AdminFormForProductComponent, {
      width: '350px',
      data: obj
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onEditProduct(productId, response[0], response[1], response[2], response[3], response[4]).subscribe(
            (msg) => {
              console.log(msg);
            }
          );
        }
      }
    );
  }

  protected onDeleteProductButtonClick(productId: number) {
    const flag = confirm('Desea eliminar el producto?')

    if (flag) {
      this.administratorService.onDeleteProduct(productId).subscribe(
        (msg) => {
          console.log(msg)
        }
      );
    }
  }
}
