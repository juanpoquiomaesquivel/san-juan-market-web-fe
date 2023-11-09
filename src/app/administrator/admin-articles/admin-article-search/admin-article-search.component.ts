import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-article-search',
  templateUrl: './admin-article-search.component.html',
  styleUrls: ['./admin-article-search.component.css']
})
export class AdminArticleSearchComponent {

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
