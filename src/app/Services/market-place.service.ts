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

    onLoadCategoryFilterList(): Observable<CategoryFilter[]> {
        return this.httpClient.get<CategoryFilter[]>(`${this.baseURL}/category/api/filters/get/all`);
    }

    onLoadProductFilterList(): Observable<ProductFilter[]> {
        return this.httpClient.get<ProductFilter[]>(`${this.baseURL}/product/api/filters/get/all`);
    }

    onLoadArticleCardList(): Observable<ArticleCard[]> {
        return this.httpClient.get<ArticleCard[]>(`${this.baseURL}/article/api/card/get/all`);
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