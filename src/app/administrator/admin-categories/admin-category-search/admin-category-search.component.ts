import { Component, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-category-search',
  templateUrl: './admin-category-search.component.html',
  styleUrls: ['./admin-category-search.component.css']
})
export class AdminCategorySearchComponent {

  protected searchedValue: string = '';

  @Output()
  searchInputChange: EventEmitter<string> = new EventEmitter<string>();

  protected onClearButtonClick() {
    this.searchedValue = '';
    this.searchInputChange.emit(this.searchedValue);
  }

  protected onSearchInputKeyup() {
    this.searchInputChange.emit(this.searchedValue);
  }
}
