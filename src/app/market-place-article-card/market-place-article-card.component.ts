import { Component, Input } from '@angular/core';
import { Article } from '../article.model';

@Component({
  selector: 'app-market-place-article-card',
  templateUrl: './market-place-article-card.component.html',
  styleUrls: ['./market-place-article-card.component.css']
})
export class MarketPlaceArticleCardComponent {

  @Input() article:Article;
  @Input() id:number;
}
