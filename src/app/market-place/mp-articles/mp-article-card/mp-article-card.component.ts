import { Component, Input } from '@angular/core';
import { ArticleCard } from 'src/app/Models/article-card.model';

@Component({
  selector: 'app-mp-article-card',
  templateUrl: './mp-article-card.component.html',
  styleUrls: ['./mp-article-card.component.css']
})
export class MpArticleCardComponent {

  @Input() article: ArticleCard;
}
