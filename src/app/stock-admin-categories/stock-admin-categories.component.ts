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

  protected getCategoriesByName(name: string) {
    this.dataService.loadCategoriesByName(name).subscribe(
      response => {
        console.log(response);
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
}
