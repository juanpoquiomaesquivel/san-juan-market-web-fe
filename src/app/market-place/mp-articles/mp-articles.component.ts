import { Component } from '@angular/core';
import { ArticleCard } from '../../Models/article-card.model';
import { MarketPlaceService } from 'src/app/Services/market-place.service';

@Component({
  selector: 'app-mp-articles',
  templateUrl: './mp-articles.component.html',
  styleUrls: ['./mp-articles.component.css']
})
export class MpArticlesComponent {

  title: string = 'Artículos';

  articleCardList: ArticleCard[] = [];
  filteredArticleCardList: ArticleCard[] = [];

  private selectedCategoryFilterId: number = 0;
  private selectedProductFilterId: number = 0;
  private keyword: string = '';

  constructor(private marketPlaceService: MarketPlaceService) { }

  ngOnInit() {
    this.marketPlaceService.OnLoadArticleCardList().subscribe((data) => {
      this.articleCardList = data;
      this.filteredArticleCardList = this.articleCardList;
    });

    this.marketPlaceService.onCategoryFilterSelectChanged.subscribe((data) => {
      this.selectedCategoryFilterId = data;
      this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
    });

    this.marketPlaceService.onProductFilterSelectChanged.subscribe((data) => {
      this.selectedProductFilterId = data;
      this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
    });

    this.marketPlaceService.onSearchFilterButtonClicked.subscribe((data) => {
      this.keyword = data;
      this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
    });
  }

  private filterArticleCardList(keyword: string): ArticleCard[] {
    let aux = this.articleCardList;

    if (this.selectedProductFilterId == 0) {
      if (this.selectedCategoryFilterId != 0) {
        aux = aux.filter((articleCard) => articleCard.categoryId == this.selectedCategoryFilterId);
      }
    } else {
      aux = aux.filter((articleCard) => articleCard.productId == this.selectedProductFilterId);
    }

    if (this.keyword != '') {
      aux = aux.filter((articleCard) => articleCard.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    return aux;
  }

  pageSize: number = 9;
  pageNumber: number = 1;
}
