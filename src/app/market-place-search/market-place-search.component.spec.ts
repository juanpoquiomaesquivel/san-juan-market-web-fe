import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceSearchComponent } from './market-place-search.component';

describe('MarketPlaceSearchComponent', () => {
  let component: MarketPlaceSearchComponent;
  let fixture: ComponentFixture<MarketPlaceSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPlaceSearchComponent]
    });
    fixture = TestBed.createComponent(MarketPlaceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
