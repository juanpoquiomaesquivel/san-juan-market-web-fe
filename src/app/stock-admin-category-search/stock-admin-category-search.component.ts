import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stock-admin-category-search',
  templateUrl: './stock-admin-category-search.component.html',
  styleUrls: ['./stock-admin-category-search.component.css']
})
export class StockAdminCategorySearchComponent {

  changeSearchValue(eventData: Event) {
    this.searchValue = (<HTMLInputElement>eventData.target).value;
  }

  searchValue: string = '';

  @Output()
  searchButtonClick: EventEmitter<string> = new EventEmitter<string>();

  onSearchButtonClick() {
    this.searchButtonClick.emit(this.searchValue);
  }
}
