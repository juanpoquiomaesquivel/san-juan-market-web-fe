import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article } from './article.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  articles: Article[];//'http://localhost:8081/article/api/all';

  private baseUrl = 'http://localhost:8081';

  loadCategories(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.baseUrl}/category/api/all`);
  }
}