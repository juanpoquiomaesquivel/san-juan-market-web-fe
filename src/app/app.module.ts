import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MarketPlaceFiltersComponent } from './market-place-filters/market-place-filters.component';
import { MarketPlaceSearchComponent } from './market-place-search/market-place-search.component';
import { MarketPlaceArticlesComponent } from './market-place-articles/market-place-articles.component';
import { MarketPlaceArticleCardComponent } from './market-place-article-card/market-place-article-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    MarketPlaceComponent,
    MarketPlaceFiltersComponent,
    MarketPlaceSearchComponent,
    MarketPlaceArticlesComponent,
    MarketPlaceArticleCardComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
