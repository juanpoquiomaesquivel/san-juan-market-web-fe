import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article } from './article.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from './category.model';
import { Product } from './product.model';

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

  loadCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/api/all`);
  }

  loadCategoriesByName(name: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/api/byname/${name}`);
  }

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/api/all`);
  }
}