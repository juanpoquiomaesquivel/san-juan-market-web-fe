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

  protected articleCardList: ArticleCard[] = [];
  protected filteredArticleCardList: ArticleCard[] = [];
  protected webPageDataStatus: string = '';

  private keyword: string = '';
  private selectedProductFilterIdList: number[] = [];

  protected totalOfResults: number;

  constructor(private marketPlaceService: MarketPlaceService) { }

  private fetchData() {
    this.webPageDataStatus = 'fetching';

    this.marketPlaceService.onLoadArticleCardList().subscribe(
      {
        next: (articleCardListData) => {
          this.webPageDataStatus = 'loading';
          this.articleCardList = articleCardListData;
          this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
        },
        error: () => {
          this.webPageDataStatus = 'error';
        },
        complete: () => {
          setTimeout(() => {
            this.webPageDataStatus = this.filteredArticleCardList.length === 0 ? 'empty' : 'data';
          }, 1000);
        }
      }
    );
  }

  ngOnInit() {
    this.fetchData()

    this.marketPlaceService.onSearchFilterButtonClicked.subscribe(
      (keyword) => {
        this.webPageDataStatus = 'loading';
        this.keyword = keyword;
        this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
        this.webPageDataStatus = this.filteredArticleCardList.length === 0 ? 'empty' : 'data';
      }
    );

    this.marketPlaceService.onFilterCheckboxChanged.subscribe(
      (selectedProductFilterIdListData) => {
        this.webPageDataStatus = 'loading';
        this.selectedProductFilterIdList = selectedProductFilterIdListData;
        this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
        this.webPageDataStatus = this.filteredArticleCardList.length === 0 ? 'empty' : 'data';
      }
    );
  }

  private filterArticleCardList(keyword: string): ArticleCard[] {
    let aux = this.articleCardList.slice();

    aux = aux.filter(
      (art) => this.selectedProductFilterIdList.includes(art.productId)
    );

    if (this.keyword !== '') {
      aux = aux.filter((art) => art.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    this.pageNumber = 1;

    return aux;
  }

  pageSize: number = 9;
  pageNumber: number = 1;
}
