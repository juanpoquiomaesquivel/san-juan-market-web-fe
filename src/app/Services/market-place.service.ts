import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryFilter } from "../Models/Market Place/category-filter.model";
import { ProductFilter } from "../Models/Market Place/product-filter.model";
import { ArticleCard } from "../Models/article-card.model";

@Injectable()
export class MarketPlaceService {

    constructor(private httpClient: HttpClient) { }

    options: {
        headers?: HttpHeaders | { [header: string]: string | string[] };
        observe?: 'body' | 'events' | 'response';
        params?:
        | HttpParams
        | {
            [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        };
        reportProgress?: boolean;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
    };

    private baseURL = 'http://localhost:8081';

    OnLoadCategoryFilterList(): Observable<CategoryFilter[]> {
        return this.httpClient.get<CategoryFilter[]>(`${this.baseURL}/category/api/filters/get/all`);
    }

    OnLoadProductFilterList(): Observable<ProductFilter[]> {
        return this.httpClient.get<ProductFilter[]>(`${this.baseURL}/product/api/filters/get/all`);
    }

    OnLoadArticleCardList(): Observable<ArticleCard[]> {
        return this.httpClient.get<ArticleCard[]>(`${this.baseURL}/article/api/card/get/all`);
    }

    onCategoryFilterSelectChanged: EventEmitter<number> = new EventEmitter<number>();
    onProductFilterSelectChanged: EventEmitter<number> = new EventEmitter<number>();
    onSearchFilterButtonClicked:  EventEmitter<string> = new EventEmitter<string>();

    categoryFilterSelect(categoryFilterId: number) {
        this.onCategoryFilterSelectChanged.emit(categoryFilterId);
    }

    productFilterSelect(productFilterId: number) {
        this.onProductFilterSelectChanged.emit(productFilterId);
    }

    searchFilterButton(keyword: string) {
        this.onSearchFilterButtonClicked.emit(keyword);
    }
}