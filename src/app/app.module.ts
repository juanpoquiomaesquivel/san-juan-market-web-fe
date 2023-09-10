import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MarketPlaceFiltersComponent } from './market-place-filters/market-place-filters.component';
import { MarketPlaceSearchComponent } from './market-place-search/market-place-search.component';
import { MarketPlaceArticlesComponent } from './market-place-articles/market-place-articles.component';
import { MarketPlaceArticleCardComponent } from './market-place-article-card/market-place-article-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StockAdministratorComponent } from './stock-administrator/stock-administrator.component';
import { StockAdminCategoriesComponent } from './stock-admin-categories/stock-admin-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { StockAdminCategorySearchComponent } from './stock-admin-category-search/stock-admin-category-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MarketPlaceComponent,
    MarketPlaceFiltersComponent,
    MarketPlaceSearchComponent,
    MarketPlaceArticlesComponent,
    MarketPlaceArticleCardComponent,
    StockAdministratorComponent,
    StockAdminCategoriesComponent,
    StockAdminCategorySearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
