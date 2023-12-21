import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-category-search',
  templateUrl: './admin-category-search.component.html',
  styleUrls: ['./admin-category-search.component.css']
})
export class AdminCategorySearchComponent {

  @Input() inputPlaceholder: string = '';

  @Output() searchInputChange: EventEmitter<string> = new EventEmitter<string>();

  protected searchedValue: string = '';

  protected onClearButtonClick() {
    this.searchedValue = '';
    this.searchInputChange.emit(this.searchedValue);
  }

  protected onSearchInputKeyup() {
    this.searchInputChange.emit(this.searchedValue);
  }
}
