import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-article-search',
  templateUrl: './admin-article-search.component.html',
  styleUrls: ['./admin-article-search.component.css']
})
export class AdminArticleSearchComponent {

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
