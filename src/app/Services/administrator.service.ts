import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Article } from '../Models/Administrator/article.model';
import { CategoryOption } from '../Models/Administrator/category-option.model';
import { Category } from '../Models/Administrator/category.model';
import { ClassOptionGroup } from '../Models/Administrator/class-option-group.model';
import { ClassOption } from '../Models/Administrator/class-option.model';
import { CommodityOption } from '../Models/Administrator/commodity-option.model';
import { FamilyOptionGroup } from '../Models/Administrator/family-option-group.model';
import { ProductOption } from '../Models/Administrator/product-option.model';
import { Message } from '../Models/message.model';
import { Product } from '../Models/Administrator/product.model';
import { ProductItem } from '../Models/Administrator/product-item.model';
import { CategoryItem } from '../Models/Administrator/category-item.model';
import { ArticleItem } from '../Models/Administrator/article-item.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8081';

  onLoadAllCategories(): Observable<CategoryItem[]> {
    return this.httpClient.get<CategoryItem[]>(`${this.baseUrl}/category/api/get/category-item/all`);
  } // ok

  onLoadFamilyOptionGroupList(): Observable<FamilyOptionGroup[]> {
    return this.httpClient.get<FamilyOptionGroup[]>(`${this.baseUrl}/family/api/get/family-option-group/all`);
  } // ok

  onLoadAvailableClassOptionList(): Observable<ClassOption[]> {
    return this.httpClient.get<ClassOption[]>(`${this.baseUrl}/class/api/get/class-option/available/all`);
  } // ok

  onLoadUnavailableClassOptionList(): Observable<ClassOption[]> {
    return this.httpClient.get<ClassOption[]>(`${this.baseUrl}/class/api/get/class-option/unavailable/all`);
  } // ok

  onLoadCurrentClassOptionList(categoryId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseUrl}/class/api/get/class-tag/of-category/${categoryId}/all`);
  } // ok

  onAddCategory(categoryData: { name: string, description: string, image: string }, addJsonClassTagIdArray: string): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append("Name", categoryData.name);
    params = params.append("Description", categoryData.description);
    params = params.append("Image", categoryData.image);

    return new Observable<Message>(
      (obs) => {
        this.httpClient.post<number>(`${this.baseUrl}/category/api/post/category-item/add`, null, { headers, params }).subscribe(
          (newCategoryId) => {
            this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/class-tag/of-category/${newCategoryId}/add`, addJsonClassTagIdArray, { headers }).subscribe(
              {
                complete: () => {
                  obs.next(new Message(102, "La categoria ha sido anadida."));
                }
              }
            );
          }
        );
      }
    );
  } // ok

  onEditCategory(categoryId: number, categoryData: { name: string, description: string, image: string }, addJsonClassTagIdArray: string, removeJsonClassTagIdArray: string): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append("Name", categoryData.name);
    params = params.append("Description", categoryData.description);
    params = params.append("Image", categoryData.image);

    return new Observable<Message>(
      (obs) => {
        forkJoin(
          {
            reqOne: this.httpClient.put<Message>(`${this.baseUrl}/category/api/put/category-item/${categoryId}/update`, null, { headers, params }),
            reqTwo: this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/class-tag/of-category/${categoryId}/add`, addJsonClassTagIdArray, { headers }),
            reqThree: this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/class-tag/remove`, removeJsonClassTagIdArray, { headers })
          }
        ).subscribe(
          {
            complete: () => {
              obs.next(new Message(102, "La categoria ha sido actualizada."));
            }
          }
        );
      }
    );
  } // ok

  onDeleteCategory(categoryId: number): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return new Observable<Message>(
      (obs) => {
        this.httpClient.get<string>(`${this.baseUrl}/class/api/get/class-tag/of-category/${categoryId}/all`, { headers }).subscribe(
          (response) => {
            const jsonClassTagIdArray = JSON.stringify(response);

            forkJoin(
              {
                reqOne: this.httpClient.put<Message>(`${this.baseUrl}/class/api/put/class-tag/remove`, jsonClassTagIdArray, { headers }),
                reqTwo: this.httpClient.delete<Message>(`${this.baseUrl}/category/api/delete/category-item/${categoryId}/remove`, { headers })
              }
            ).subscribe(
              {
                complete: () => {
                  obs.next(new Message(103, "Producto eliminado."));
                }
              }
            );
          }
        );
      }
    );
  } // ok

  /* PRODUCTS */

  onLoadAllProducts(): Observable<ProductItem[]> {
    return this.httpClient.get<ProductItem[]>(`${this.baseUrl}/product/api/get/product-item/all`);
  } // ok

  onLoadCategoryIdOfProduct(productId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/product/api/get/product-item/${productId}/category-id`);
  } // ok

  onLoadCategoryOptionList(): Observable<CategoryOption[]> {
    return this.httpClient.get<CategoryOption[]>(`${this.baseUrl}/category/api/get/category-option/all`);
  } // ok

  onLoadClassOptionGroupList(categoryId: number): Observable<ClassOptionGroup[]> {
    return this.httpClient.get<ClassOptionGroup[]>(`${this.baseUrl}/class/api/get/class-option-group/of-category/${categoryId}/all`);
  } // ok

  onLoadAvailableCommodityOptionList(jsonClassTagIdArray: string): Observable<CommodityOption[]> {
    let params = new HttpParams();
    params = params.append('JsonClassTagIdArray', jsonClassTagIdArray);

    return this.httpClient.get<CommodityOption[]>(`${this.baseUrl}/commodity/api/get/commodity-option/of-classes/available/all`, { params });
  } // ok

  onLoadUnavailableCommodityOptionList(jsonClassTagIdArray: string): Observable<CommodityOption[]> {
    let params = new HttpParams();
    params = params.append('JsonClassTagIdArray', jsonClassTagIdArray);

    return this.httpClient.get<CommodityOption[]>(`${this.baseUrl}/commodity/api/get/commodity-option/of-classes/unavailable/all`, { params });
  } // ok

  onLoadCurrentCommodityOptionList(productId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseUrl}/commodity/api/get/commodity-tag/of-product/${productId}/all`);
  } // ok

  onAddProduct(productData: { name: string, description: string, image: string, category: number }, addJsonCommodityTagIdArray: string): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append("Name", productData.name);
    params = params.append("Description", productData.description);
    params = params.append("Image", productData.image);
    params = params.append("CategoryId", productData.category);

    return new Observable<Message>(
      (obs) => {
        this.httpClient.post<number>(`${this.baseUrl}/product/api/post/product-item/add`, { headers, params }).subscribe(
          (newProductId) => {
            this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commodity-tag/of-product/${newProductId}/add`, addJsonCommodityTagIdArray, { headers }).subscribe(
              (msg) => {
                obs.next(new Message(101, "Producto agregado."));
              }
            );
          }
        );
      }
    );
  } // ok

  onEditProduct(productId: number, productData: { name: string, description: string, image: string, category: number }, addJsonCommodityTagIdArray: string, removeJsonCommodityTagIdArray: string): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append("Name", productData.name);
    params = params.append("Description", productData.description);
    params = params.append("Image", productData.image);
    params = params.append("CategoryId", productData.category);

    return new Observable<Message>(
      (obs) => {
        forkJoin(
          {
            reqOne: this.httpClient.put<Message>(`${this.baseUrl}/product/api/put/product-item/${productId}/update`, null, { headers, params }),
            reqTwo: this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commodity-tag/of-product/${productId}/add`, addJsonCommodityTagIdArray, { headers }),
            reqThree: this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commodity-tag/remove`, removeJsonCommodityTagIdArray, { headers })
          }
        ).subscribe(
          {
            complete: () => {
              obs.next(new Message(102, "Producto actualizado."));
            }
          }
        );
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
        this.httpClient.get<string>(`${this.baseUrl}/commodity/api/get/commodity-tag/of-product/${productId}/all`, { headers }).subscribe(
          (response) => {
            const commodityIdArray = JSON.stringify(response);

            forkJoin(
              {
                reqOne: this.httpClient.put<Message>(`${this.baseUrl}/commodity/api/put/commodity-tag/remove`, commodityIdArray, { headers }),
                reqTwo: this.httpClient.delete<Message>(`${this.baseUrl}/product/api/delete/product-item/${productId}/remove`, { headers })
              }
            ).subscribe(
              {
                complete: () => obs.next(new Message(103, "Producto eliminado."))
              }
            );
          }
        );
      }
    );
  } // ok

  /* ARTICLES */

  onLoadAllArticles(): Observable<ArticleItem[]> {
    return this.httpClient.get<ArticleItem[]>(`${this.baseUrl}/article/api/get/article-item/all`);
  } // ok

  onLoadProductIdOfArticle(articleId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/article/api/get/article-item/${articleId}/product-id`);
  } // ok

  onLoadProductOptionList(): Observable<ProductOption[]> {
    return this.httpClient.get<ProductOption[]>(`${this.baseUrl}/product/api/get/product-option/all`);
  } // ok

  onAddArticle(articleData: { name: string, description: string, price: number, image: string, barCode: string, product: number }): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        'Accept': "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append("Name", articleData.name);
    params = params.append("Description", articleData.description);
    params = params.append("Price", articleData.price);
    params = params.append("Image", articleData.image);
    params = params.append("BarCode", articleData.barCode);
    params = params.append("ProductId", articleData.product);

    return this.httpClient.post<Message>(`${this.baseUrl}/article/api/post/article-item/add`, null, { headers, params });
  } // ?

  onEditArticle(articleId: number, articleData: { name: string, description: string, price: number, image: string, barCode: string, product: number }): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        'Accept': "application/json, text/plain, */*"
      }
    );

    let params = new HttpParams();
    params = params.append("Name", articleData.name);
    params = params.append("Description", articleData.description);
    params = params.append("Price", articleData.price);
    params = params.append("Image", articleData.image);
    params = params.append("BarCode", articleData.barCode);
    params = params.append("ProductId", articleData.product);

    return this.httpClient.put<Message>(`${this.baseUrl}/article/api/put/article-item/${articleId}/update`, null, { headers, params })
  } // ok

  onDeleteArticle(articleId: number): Observable<Message> {
    const headers = new HttpHeaders(
      {
        'Content-Type': "application/json",
        Accept: "application/json, text/plain, */*"
      }
    );

    return this.httpClient.delete<Message>(`${this.baseUrl}/article/api/delete/article-item/${articleId}/remove`, { headers })
  } // ?
}
