import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MarketPlaceFiltersComponent } from './market-place-filters/market-place-filters.component';
import { MarketPlaceSearchComponent } from './market-place-search/market-place-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketPlaceComponent,
    MarketPlaceFiltersComponent,
    MarketPlaceSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
