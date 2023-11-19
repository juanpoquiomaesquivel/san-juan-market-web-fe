import { Injectable } from '@angular/core';
import { ClassOption } from '../Models/Administrator/class-option.model';
import { Observable } from 'rxjs';
import { FamilyOptionGroup } from '../Models/Administrator/family-option-group.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../Models/message.model';
import { Category } from '../Models/Administrator/category.model';
import { Product } from '../Models/product.model';
import { ClassOptionGroup } from '../Models/Administrator/class-option-group.model';
import { CommodityOption } from '../Models/Administrator/commodity-option.model';
import { CategoryOption } from '../Models/Administrator/category-option.model';
import { Article } from '../Models/Administrator/article.model';
import { ProductOption } from '../Models/Administrator/product-option.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

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

  onLoadAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/api/get/all`);
  } // ok

  onLoadFamilyOptionGroupList(): Observable<FamilyOptionGroup[]> {
    return this.httpClient.get<FamilyOptionGroup[]>(`${this.baseUrl}/family/api/get/familyoptiongroup`);
  }

  onLoadAvailableClassOptionList(): Observable<ClassOption[]> {
    return this.httpClient.get<ClassOption[]>(`${this.baseUrl}/class/api/get/classoption/available/all`);
  }

  onLoadCurrentClassOptionList(categoryId: number): Observable<ClassOption[]> {
    return this.httpClient.get<ClassOption[]>(`${this.baseUrl}/class/api/get/classoption/forcategory/${categoryId}`);
  }

  onAddCategory(categoryName: string, categoryDescription: string, classIdArray: string): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return new Observable<Message>(
      (obs) => {
        this.httpClient.post<number>(`${this.baseUrl}/category/api/post/newcategory?Name=${categoryName}&Description=${categoryDescription}`, { headers }).subscribe(
          (newCategoryId) => {
            this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/classtag/forcategory/${newCategoryId}/add`, classIdArray, { headers }).subscribe(
              (msg) => {
                obs.next(msg);
              }
            );
          }
        );
      }
    );
  }

  onEditCategory(categoryId: number, categoryName: string, categoryDescription: string, addClassIdArray: string, removeClassIdArray: string): Observable<String> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    this.httpClient.put<Message>(`${this.baseUrl}/category/api/put/byid/${categoryId}?Name=${categoryName}&Description=${categoryDescription}`, null, { headers }).subscribe();
    this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/classtag/forcategory/${categoryId}/add`, addClassIdArray, { headers }).subscribe();
    this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/classtag/remove`, removeClassIdArray, { headers }).subscribe();

    return new Observable<string>(
      (obs) => {
        obs.next('Categoria actualizada.');
      }
    );
  }

  onDeleteCategory(categoryId: number): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return new Observable<Message>(
      (obs) => {
        this.httpClient.get<string>(`${this.baseUrl}/class/api/get/forcategory/${categoryId}`, { headers }).subscribe(
          (response) => {
            const jsonArrayId = JSON.stringify(response);

            this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/classtag/remove`, jsonArrayId, { headers }).subscribe(
              (msg) => {
                this.httpClient.delete<Message>(`${this.baseUrl}/category/api/delete/byid/${categoryId}`, { headers }).subscribe(
                  (msg2) => obs.next(msg2)
                );
              }
            );
          }
        );
      }
    );
  }

  /* PRODUCTS */

  onLoadAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/api/get/all`);
  } // ok

  onLoadCategoryOptionList(): Observable<CategoryOption[]> {
    return this.httpClient.get<CategoryOption[]>(`${this.baseUrl}/category/api/get/categoryoption/all`);
  } // ok

  onLoadClassOptionGroupList(categoryId: number): Observable<ClassOptionGroup[]> {
    return this.httpClient.get<ClassOptionGroup[]>(`${this.baseUrl}/class/api/get/classoptiongroup/forcategory/${categoryId}/all`);
  } // ok

  onLoadAvailableCommodityOptionList(classIdArray: string): Observable<CommodityOption[]> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        'Accept': "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append('ClassIdArray', classIdArray);

    return this.httpClient.get<CommodityOption[]>(`${this.baseUrl}/commodity/api/get/commodityoption/forclasses/available/all`, { params });
  } // ok

  onLoadCurrentCommodityOptionList(productId: number): Observable<CommodityOption[]> {
    return this.httpClient.get<CommodityOption[]>(`${this.baseUrl}/commodity/api/get/commodityoption/forproduct/${productId}/all`);
  } // ok

  onAddProduct(productName: string, productDescription: string, categoryId: number, commodityIdArray: string): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return new Observable<Message>(
      (obs) => {
        this.httpClient.post<number>(`${this.baseUrl}/product/api/post/newproduct?Name=${productName}&Description=${productDescription}&CategoryId=${categoryId}`, { headers }).subscribe(
          (newProductId) => {
            this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commoditytag/forproduct/${newProductId}/add`, commodityIdArray, { headers }).subscribe(
              (msg) => {
                obs.next(msg);
              }
            );
          }
        );
      }
    );
  } // ok

  onEditProduct(productId: number, productName: string, productDescription: string, categoryId: number, selectedCommodityIdArray: string, deletedCommodityIdArray: string): Observable<String> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    this.httpClient.put<Message>(`${this.baseUrl}/product/api/put/byid/${productId}?Name=${productName}&Description=${productDescription}&CategoryId=${categoryId}`, null, { headers }).subscribe();
    this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commoditytag/forproduct/${productId}/add`, selectedCommodityIdArray, { headers }).subscribe();
    this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commoditytag/remove`, deletedCommodityIdArray, { headers }).subscribe();

    return new Observable<string>(
      (obs) => {
        obs.next('Producto Actualizado');
      }
    );
  } // ok

  onDeleteProduct(productId: number): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return new Observable<Message>(
      (obs) => {
        this.httpClient.get<string>(`${this.baseUrl}/commodity/api/get/forproduct/${productId}`, { headers }).subscribe(
          (response) => {
            const commodityIdArray = JSON.stringify(response);

            this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commoditytag/remove`, commodityIdArray, { headers }).subscribe(
              (msg) => {
                this.httpClient.delete<Message>(`${this.baseUrl}/product/api/delete/byid/${productId}`, { headers }).subscribe(
                  (msg2) => obs.next(msg2)
                );
              }
            );
          }
        );
      }
    );
  } // ok

  /* ARTICLES */

  onLoadAllArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.baseUrl}/article/api/get/all`);
  } // ok

  onLoadProductOptionList(): Observable<ProductOption[]> {
    return this.httpClient.get<ProductOption[]>(`${this.baseUrl}/product/api/get/productoption/all`);
  } // ok

  onAddArticle(article: Article): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        'Accept': "application/json, text/plain, */*"
      }
    );

    return this.httpClient.post<Message>(`${this.baseUrl}/article/api/post/newarticle?Name=${article.name}&Description=${article.description}&Price=${article.price}&Stock=${article.stock}&Img=${article.img}&BarCode=${article.barCode}&ProductId=${article.productId}`, { headers })
  } // ok

  onEditArticle(article: Article): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        'Accept': "application/json, text/plain, */*"
      }
    );

    return this.httpClient.put<Message>(`${this.baseUrl}/article/api/put/byid/${article.id}?Name=${article.name}&Description=${article.description}&Price=${article.price}&Stock=${article.stock}&Img=${article.img}&BarCode=${article.barCode}&ProductId=${article.productId}`, { headers })
  } // ok

  onDeleteArticle(articleId: number): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return this.httpClient.delete<Message>(`${this.baseUrl}/article/api/delete/byid/${articleId}`, { headers })
  } // ok
}
