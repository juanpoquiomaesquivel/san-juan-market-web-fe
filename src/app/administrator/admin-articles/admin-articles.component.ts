import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/Models/Administrator/article.model';
import { AdministratorService } from 'src/app/Services/administrator.service';
import { AdminFormForArticleComponent } from './admin-form-for-article/admin-form-for-article.component';
import { ArticleItem } from 'src/app/Models/Administrator/article-item.model';
import { AdminImagePreviewComponent } from '../admin-image-preview/admin-image-preview.component';
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.css']
})
export class AdminArticlesComponent {

  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private administratorService: AdministratorService) { }

  private articleList: ArticleItem[] = [];
  protected filteredArticleList: ArticleItem[] = [];
  protected webPageDataStatus: string = '';

  protected placeholder: string = 'Buscar artículo por nombre.';
  protected keyword: string = '';
  protected currentSort: Sort = null;

  private fetchData() {
    this.webPageDataStatus = 'fetching';

    this.administratorService.onLoadAllArticles().subscribe(
      {
        next: (articleDataList) => {
          this.webPageDataStatus = 'loading';
          this.articleList = articleDataList;
          this.filteredArticleList = this.filterArticleList(this.keyword, this.currentSort);
        },
        error: () => {
          this.webPageDataStatus = 'error';
        },
        complete: () => {
          this.isBeingModified = 0;
          setTimeout(() => {
            this.webPageDataStatus = this.filteredArticleList.length === 0 ? 'empty' : 'data';
          }, 1000);
        }
      }
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }

  protected headerList: any[] = [
    { name: '#', label: '#', styles: { width: '4%' }, disabled: true },
    { name: 'code', label: 'código', styles: { width: '10%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'name', label: 'nombre', styles: { 'min-width': '200px', width: '15%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'description', label: 'descripción', styles: { 'min-width': '250px', width: 'auto', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'price', label: 'precio', styles: { width: '6%', 'text-transform': 'capitalize' }, disabled: true },
    { name: 'image', label: 'imagen', styles: { width: '6%', 'text-transform': 'capitalize' }, disabled: true },
    { name: 'barcode', label: 'código de barras', styles: { 'min-width': '150px', width: '15%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'product', label: 'producto', styles: { 'min-width': '150px', width: '15%', 'text-transform': 'capitalize' }, disabled: false },
    { name: 'actions', label: 'acciones', styles: { width: '8%', 'text-transform': 'capitalize' }, disabled: true }
  ];

  protected editButtonLabel: string = 'Editar';
  protected deleteButtonLabel: string = 'Eliminar';

  p: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page

  // Function to change the page
  protected onPageChangeEvent(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  protected onSearchInputChangeEvent(keyword: string) {
    this.keyword = keyword;

    if (this.webPageDataStatus !== 'error') {
      this.filteredArticleList = this.filterArticleList(this.keyword, this.currentSort);
      this.webPageDataStatus = this.filteredArticleList.length === 0 ? 'empty' : 'data';
    }
  }

  protected onSortChangeEvent(sort: Sort) {
    this.currentSort = sort;

    if (this.webPageDataStatus !== 'error') {
      this.filteredArticleList = this.filterArticleList(this.keyword, this.currentSort);
      this.webPageDataStatus = this.filteredArticleList.length === 0 ? 'empty' : 'data';
    }
  }

  private filterArticleList(keyword: string, sort: Sort) {
    let aux = this.articleList.slice();

    if (sort != null && sort.direction != '') {
      switch (sort.active) {
        case 'code':
          this.placeholder = 'Buscar artículo por código.';
          aux = aux.filter((art) => art.code.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'description':
          this.placeholder = 'Buscar artículo por descripción.';
          aux = aux.filter((art) => art.description.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'barcode':
          this.placeholder = 'Buscar artículo por código de barras.';
          aux = aux.filter((art) => art.barCode.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'product':
          this.placeholder = 'Buscar artículo por product.';
          aux = aux.filter((art) => art.product.toLowerCase().includes(keyword.toLowerCase()));
          break;
        case 'name':
        default:
          this.placeholder = 'Buscar producto por nombre.';
          aux = aux.filter((art) => art.name.toLowerCase().includes(keyword.toLowerCase()));
      }

      aux.sort(
        (a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'code':
              return compare(a.code, b.code, isAsc);
            case 'name':
              return compare(a.name, b.name, isAsc);
            case 'description':
              return compare(a.description, b.description, isAsc);
            case 'barcode':
              return compare(a.barCode, b.barCode, isAsc);
            case 'product':
              return compare(a.product, b.product, isAsc);
            default:
              return 0;
          }
        });
    } else {
      this.placeholder = 'Buscar artículo por nombre.';
      aux = aux.filter((art) => art.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    return aux;
  }

  protected onUpdateButtonClick() {
    this.fetchData();
  }

  protected onOpenArticleImageButtonClick(image: string) {
    this.matDialog.open(AdminImagePreviewComponent, {
      width: '400px',
      data: image
    });
  }

  protected onAddArticleButtonClick() {
    const dg = this.matDialog.open(AdminFormForArticleComponent, {
      width: '400px',
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onAddArticle(response).subscribe(
            (msg) => {
              if (msg.code === 101) {
                this.fetchData();
                this.matSnackBar.open(msg.description, '', { duration: 4000 });
              }
            }
          );
        }
      }
    );
  }

  protected isBeingModified: number = 0;

  protected onEditArticleButtonClick(articleId: number) {
    this.isBeingModified = articleId;
    const obj = this.articleList.find((art) => art.id === articleId);
    const dg = this.matDialog.open(AdminFormForArticleComponent, {
      width: '400px',
      data: obj
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != undefined) {
          this.administratorService.onEditArticle(articleId, response).subscribe(
            (msg) => {
              if (msg.code === 102) {
                this.fetchData();
                this.matSnackBar.open(msg.description, '', { duration: 4000 });
              }
            }
          );
        } else {
          this.isBeingModified = 0;
        }
      }
    );
  }

  protected onDeleteArticleButtonClick(articleId: number) {
      this.isBeingModified = articleId;
    const flag = confirm('Desea eliminar el articulo?')

    if (flag) {
      this.administratorService.onDeleteArticle(articleId).subscribe(
        (msg) => {
          if (msg.code === 103) {
            this.fetchData();
            this.matSnackBar.open(msg.description, '', { duration: 4000 });
          }
        }
      );
    } else
      this.isBeingModified = 0;
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
