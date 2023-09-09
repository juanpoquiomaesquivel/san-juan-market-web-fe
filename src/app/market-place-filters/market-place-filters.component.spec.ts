import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceFiltersComponent } from './market-place-filters.component';

describe('MarketPlaceFiltersComponent', () => {
  let component: MarketPlaceFiltersComponent;
  let fixture: ComponentFixture<MarketPlaceFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPlaceFiltersComponent]
    });
    fixture = TestBed.createComponent(MarketPlaceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
