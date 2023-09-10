import { Component } from '@angular/core';
import { Category } from '../category.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stock-admin-categories',
  templateUrl: './stock-admin-categories.component.html',
  styleUrls: ['./stock-admin-categories.component.css']
})
export class StockAdminCategoriesComponent {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCategories();
    console.log('IS NOT WORKING');
  }

  private getCategories() {
    this.dataService.loadCategories().subscribe(
      response => {
        console.log(response);
        this.listOfCategories = response;
      }
    );
  }

  listOfHeaders: string[] = ['Código', 'Nombre', 'Descripción', '', ''];

  editButtonLabel: string = 'Editar';
  deleteButtonLabel: string = 'Eliminar';

  listOfCategories: Category[] = [
    new Category('CAT00000', 'cat0', 'desc0'),
    new Category('CAT00000', 'cat0', 'desc0'),
    new Category('CAT00004', 'cat0', 'desc0'),
  ];

  p: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page

  // Function to change the page
  onPageChange(newPage: number): void {
    this.p = newPage;
  }
}
