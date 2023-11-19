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

  private keyword: string = '';
  private selectedProductFilterIdList: number[] = [];

  protected isFetching: boolean = true;
  protected isFiltering: boolean = false;
  protected isEmpty: boolean = true;

  protected totalOfResults: number;

  constructor(private marketPlaceService: MarketPlaceService) { }

  ngOnInit() {
    this.isFetching = true;

    this.marketPlaceService.onLoadArticleCardList().subscribe(
      {
        next: (articleCardListData) => {
          this.articleCardList = articleCardListData;
          this.isFetching = false;
          this.isFiltering = true;
          this.filteredArticleCardList =this.articleCardList;
          this.isFiltering = false;
          this.isEmpty = (this.articleCardList.length === 0);
        },
        error: () => {
          this.isFetching = false;
          this.isFiltering = false;
          this.isEmpty = true;
        }
      }
    );

    this.marketPlaceService.onSearchFilterButtonClicked.subscribe(
      (keyword) => {
        this.isFiltering = true;
        this.keyword = keyword;
        this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
        this.isFiltering = false;
        this.isEmpty = (this.articleCardList.length === 0);
      }
    );

    this.marketPlaceService.onFilterCheckboxChanged.subscribe(
      (selectedProductFilterIdListData) => {
        this.isFiltering = true;
        this.selectedProductFilterIdList = selectedProductFilterIdListData;
        this.filteredArticleCardList = this.filterArticleCardList(this.keyword);
        this.isFiltering = false;
        this.isEmpty = (this.articleCardList.length === 0);
      }
    );
  }

  private filterArticleCardList(keyword: string): ArticleCard[] {
    let aux = this.articleCardList;

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
