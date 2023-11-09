import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/Models/Administrator/article.model';
import { AdministratorService } from 'src/app/Services/administrator.service';
import { AdminFormForArticleComponent } from './admin-form-for-article/admin-form-for-article.component';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.css']
})
export class AdminArticlesComponent {

  constructor(private matDialog: MatDialog, private administratorService: AdministratorService) { }

  private articleList: Article[];
  protected filteredArticleList: Article[];

  ngOnInit(): void {
    this.administratorService.onLoadAllArticles().subscribe(
      (allArticles) => {
        this.articleList = allArticles;
        this.filteredArticleList = this.articleList;
      }
    );
  }

  protected listOfHeaders: string[] = ['#', 'Código', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Imagen', 'Código de barras', '', ''];
  protected listOfWidths = [
    { width: '4%' },
    { width: '10%' },
    { width: '30%' },
    { width: '10%' },
    { width: '8%' },
    { width: '8%' },
    { width: '8%' },
    { width: '8%' },
    { width: '7%' },
    { width: '7%' }
  ];

  protected editButtonLabel: string = 'Editar';
  protected deleteButtonLabel: string = 'Eliminar';

  p: number = 1; // Current page number
  itemsPerPage: number = 5; // Items per page

  // Function to change the page
  onPageChange(newPage: number): void {
    this.p = newPage;
  }

  protected previousLabel: string = 'Anterior';
  protected nextLabel: string = 'Siguiente';

  onSearchButtonClicked(data: string) {
    // this.getCategoriesByName(data);
  }

  protected onAddArticleButtonClick() {
    const dg = this.matDialog.open(AdminFormForArticleComponent, {
      width: '350px',
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onAddArticle(response).subscribe(
            (msg) => {
              console.log(msg);
            }
          );
        }
      }
    );
  }

  protected onEditArticleButtonClick(articleId: number) {
    const dg = this.matDialog.open(AdminFormForArticleComponent, {
      width: '350px',
      data: this.articleList.find((art) => art.id === articleId)
    });

    dg.afterClosed().subscribe(
      (response) => {
        if (response != false) {
          this.administratorService.onEditArticle(response).subscribe(
            (msg) => {
              console.log(msg);
            }
          );
        }
      }
    );
  }

  protected onDeleteArticleButtonClick(articleId: number) {
    const flag = confirm('Desea eliminar el articulo?')

    if (flag) {
      this.administratorService.onDeleteArticle(articleId).subscribe(
        (msg) => {
          console.log(msg)
        }
      );
    }
  }
}
