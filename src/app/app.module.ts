import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminCategoriesComponent } from './administrator/admin-categories/admin-categories.component';
import { AdminCategorySearchComponent } from './administrator/admin-categories/admin-category-search/admin-category-search.component';
import { AdminFormAddCategoryComponent } from './administrator/admin-categories/admin-form-add-category/admin-form-add-category.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MpArticleCardComponent } from './market-place/mp-articles/mp-article-card/mp-article-card.component';
import { MpArticlesComponent } from './market-place/mp-articles/mp-articles.component';
import { MpFiltersComponent } from './market-place/mp-filters/mp-filters.component';
import { MpSearchComponent } from './market-place/mp-search/mp-search.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { AdminArticleSearchComponent } from './administrator/admin-articles/admin-article-search/admin-article-search.component';
import { AdminArticlesComponent } from './administrator/admin-articles/admin-articles.component';
import { AdminFormForArticleComponent } from './administrator/admin-articles/admin-form-for-article/admin-form-for-article.component';
import { AdminImagePreviewComponent } from './administrator/admin-image-preview/admin-image-preview.component';
import { AdminFormForProductComponent } from './administrator/admin-products/admin-form-for-product/admin-form-for-product.component';
import { AdminProductSearchComponent } from './administrator/admin-products/admin-product-search/admin-product-search.component';
import { AdminProductsComponent } from './administrator/admin-products/admin-products.component';
import { FooterComponent } from './footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'market-place', component: MarketPlaceComponent },
  {
    path: 'administrator', component: AdministratorComponent, children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'articles', component: AdminArticlesComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MarketPlaceComponent,
    MpFiltersComponent,
    MpSearchComponent,
    MpArticlesComponent,
    MpArticleCardComponent,
    AdministratorComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminArticlesComponent,
    AdminCategorySearchComponent,
    HeaderComponent,
    HomeComponent,
    AdminFormAddCategoryComponent,
    AdminProductSearchComponent,
    AdminFormForProductComponent,
    AdminArticleSearchComponent,
    AdminFormForArticleComponent,
    FooterComponent,
    LoginComponent,
    AdminImagePreviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
