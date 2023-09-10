import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdminCategorySearchComponent } from './stock-admin-category-search.component';

describe('StockAdminCategorySearchComponent', () => {
  let component: StockAdminCategorySearchComponent;
  let fixture: ComponentFixture<StockAdminCategorySearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockAdminCategorySearchComponent]
    });
    fixture = TestBed.createComponent(StockAdminCategorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
