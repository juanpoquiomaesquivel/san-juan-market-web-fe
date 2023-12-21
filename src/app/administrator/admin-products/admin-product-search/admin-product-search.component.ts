import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-product-search',
  templateUrl: './admin-product-search.component.html',
  styleUrls: ['./admin-product-search.component.css']
})
export class AdminProductSearchComponent {

  protected searchedValue: string = '';

  @Input() inputPlaceholder: string = '';

  @Output() searchInputChange: EventEmitter<string> = new EventEmitter<string>();

  protected onClearButtonClick() {
    this.searchedValue = '';
    this.searchInputChange.emit(this.searchedValue);
  }

  protected onSearchInputKeyup() {
    this.searchInputChange.emit(this.searchedValue);
  }
}
