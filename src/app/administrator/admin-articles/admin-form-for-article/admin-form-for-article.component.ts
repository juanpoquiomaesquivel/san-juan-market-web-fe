import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/Models/Administrator/article.model';
import { ProductOption } from 'src/app/Models/Administrator/product-option.model';
import { AdministratorService } from 'src/app/Services/administrator.service';

@Component({
  selector: 'app-admin-form-for-article',
  templateUrl: './admin-form-for-article.component.html',
  styleUrls: ['./admin-form-for-article.component.css']
})
export class AdminFormForArticleComponent {

  protected productOptionList: ProductOption[];
  protected selectedProductOptionId: number = 0;

  protected articleName: string = '';
  protected articleDescription: string = '';
  protected articlePrice: number = 0;
  protected articleStock: number = 0;
  protected articleImg: string = '';
  protected articleBarCode: string = '';

  protected result() {
    return new Article(
      this.articleData != undefined ? this.articleData.id : null,
      null,
      this.articleName,
      this.articleDescription,
      this.articlePrice,
      this.articleStock,
      this.articleImg,
      this.articleBarCode,
      this.selectedProductOptionId
    )
  }

  protected onProductOptionSelectChange(event: Event) {
    this.selectedProductOptionId = parseInt((<HTMLSelectElement>event.target).value);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public articleData: Article, private administratorService: AdministratorService) { }

  ngOnInit() {
    if (this.articleData != undefined) {
      this.articleName = this.articleData.name;
      this.articleDescription = this.articleData.description;
      this.articlePrice = this.articleData.price;
      this.articleStock = this.articleData.stock;
      this.articleImg = this.articleData.img;
      this.articleBarCode = this.articleData.barCode;
      this.selectedProductOptionId = this.articleData.productId;
    }

    this.administratorService.onLoadProductOptionList().subscribe(
      (dataProductOptionList) => {
        this.productOptionList = dataProductOptionList;
        this.selectedProductOptionId = this.selectedProductOptionId === 0 ? this.productOptionList.at(0).id : this.selectedProductOptionId;
      }
    );
  }
}
