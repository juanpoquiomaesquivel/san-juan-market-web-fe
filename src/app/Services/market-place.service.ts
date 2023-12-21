import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryFilter } from "../Models/Market Place/category-filter.model";
import { ProductFilter } from "../Models/Market Place/product-filter.model";
import { ArticleCard } from "../Models/article-card.model";

@Injectable()
export class MarketPlaceService {

    constructor(private httpClient: HttpClient) { }

    private baseURL = 'http://localhost:8081';

    onLoadCategoryFilterList(): Observable<CategoryFilter[]> {
        return this.httpClient.get<CategoryFilter[]>(`${this.baseURL}/category/api/get/filter/all`);
    }

    onLoadProductFilterList(): Observable<ProductFilter[]> {
        return this.httpClient.get<ProductFilter[]>(`${this.baseURL}/product/api/get/filter/all`);
    }

    onLoadArticleCardList(): Observable<ArticleCard[]> {
        return this.httpClient.get<ArticleCard[]>(`${this.baseURL}/article/api/get/card/all`);
    }

    onSearchFilterButtonClicked: EventEmitter<string> = new EventEmitter<string>();
    onFilterCheckboxChanged: EventEmitter<number[]> = new EventEmitter<any[]>();

    searchFilterButton(keyword: string) {
        this.onSearchFilterButtonClicked.emit(keyword);
    }

    filterCheckboxChange(productFilterIdList: number[]) {
        this.onFilterCheckboxChanged.emit(productFilterIdList);
    }
}