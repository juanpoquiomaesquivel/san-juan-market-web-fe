import { Component } from '@angular/core';
import { Article } from '../article.model';

@Component({
  selector: 'app-market-place-articles',
  templateUrl: './market-place-articles.component.html',
  styleUrls: ['./market-place-articles.component.css']
})
export class MarketPlaceArticlesComponent {

  title: string = 'Artículos';

  listOfArticles: Article[] = [
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', ''),
    new Article('ART00000', 'art0', 'desc0', 12, 15, 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', 'avx', '')]

  pageSize: number = 9;
  pageNumber: number = 1;
}
