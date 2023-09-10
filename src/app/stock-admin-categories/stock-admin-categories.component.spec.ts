import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdminCategoriesComponent } from './stock-admin-categories.component';

describe('StockAdminCategoriesComponent', () => {
  let component: StockAdminCategoriesComponent;
  let fixture: ComponentFixture<StockAdminCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockAdminCategoriesComponent]
    });
    fixture = TestBed.createComponent(StockAdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
