import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceArticlesComponent } from './market-place-articles.component';

describe('MarketPlaceArticlesComponent', () => {
  let component: MarketPlaceArticlesComponent;
  let fixture: ComponentFixture<MarketPlaceArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPlaceArticlesComponent]
    });
    fixture = TestBed.createComponent(MarketPlaceArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
