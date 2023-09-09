import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceArticleCardComponent } from './market-place-article-card.component';

describe('MarketPlaceArticleCardComponent', () => {
  let component: MarketPlaceArticleCardComponent;
  let fixture: ComponentFixture<MarketPlaceArticleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPlaceArticleCardComponent]
    });
    fixture = TestBed.createComponent(MarketPlaceArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
