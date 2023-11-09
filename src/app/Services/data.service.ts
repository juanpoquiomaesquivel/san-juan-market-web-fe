import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ArticleCard } from '../Models/article-card.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from '../Models/Administrator/category.model';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
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

  private baseUrl = 'http://localhost:8081';

  loadAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/api/get/all`);
  }

  loadCategoriesContainingName(name: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/api/get/byname?name=${name}`);
  }

  loadAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/api/get/all`);
  }
}