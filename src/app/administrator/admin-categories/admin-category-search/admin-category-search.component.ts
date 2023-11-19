import { Component, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-category-search',
  templateUrl: './admin-category-search.component.html',
  styleUrls: ['./admin-category-search.component.css']
})
export class AdminCategorySearchComponent {

  protected filters: any[] = [
    { value: 'id', label: 'Id' },
    { value: 'name', label: 'Nombre' },
    { value: 'description', label: 'Descripción' },
  ];

  protected selectedFilter: string = '';

  protected selectFilter(filter: string) {
    this.selectedFilter = filter;
  }

  ngOnInit() {
    this.selectFilter = this.filters[0];
  }

  protected searchValue: string = '';

  @Output()
  searchButtonClick: EventEmitter<string> = new EventEmitter<string>();

  onSearchButtonClick() {
    this.searchButtonClick.emit(this.searchValue);
  }
}
