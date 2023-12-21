import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleItem } from 'src/app/Models/Administrator/article-item.model';
import { Article } from 'src/app/Models/Administrator/article.model';
import { ProductOption } from 'src/app/Models/Administrator/product-option.model';
import { AdministratorService } from 'src/app/Services/administrator.service';

@Component({
  selector: 'app-admin-form-for-article',
  templateUrl: './admin-form-for-article.component.html',
  styleUrls: ['./admin-form-for-article.component.css']
})
export class AdminFormForArticleComponent {
  protected articleFormTitle = "nuevo artículo";
  protected articleFormSaveButtonTitle = "agregar";

  protected productOptionList: ProductOption[] = [];

  private articleName: string = '';
  private articleDescription: string = '';
  private articlePrice: number = null;
  private articleImage: string = '';
  private articleBarCode: string = '';

  protected articleForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<AdminFormForArticleComponent>, @Inject(MAT_DIALOG_DATA) public articleData: ArticleItem, private administratorService: AdministratorService) { }

  protected isLoading: boolean;

  ngOnInit() {
    this.administratorService.onLoadProductOptionList().subscribe(
      {
        next: (productOptionListData) => {
          this.productOptionList = productOptionListData;
        }
      }
    );

    if (this.articleData != undefined) {
      this.articleFormTitle = "editar artículo";
      this.articleFormSaveButtonTitle = "guardar";
      this.articleName = this.articleData.name;
      this.articleDescription = this.articleData.description;
      this.articlePrice = this.articleData.price;
      this.articleImage = this.articleData.image;
      this.articleBarCode = this.articleData.barCode;

      this.administratorService.onLoadProductIdOfArticle(this.articleData.id).subscribe(
        {
          next: (productIdData) => {
            this.articleForm = new FormGroup(
              {
                product: new FormControl(productIdData, [Validators.required]),
                name: new FormControl(this.articleName, [Validators.required]),
                description: new FormControl(this.articleDescription, []),
                price: new FormControl(this.articlePrice, [Validators.required]),
                image: new FormControl(this.articleImage, []),
                barcode: new FormControl(this.articleBarCode, [])
              }
            );
          }
        }
      );
    } else {
      this.articleForm = new FormGroup(
        {
          product: new FormControl(1, [Validators.required]),
          name: new FormControl(this.articleName, [Validators.required]),
          description: new FormControl(this.articleDescription, []),
          price: new FormControl(this.articlePrice, [Validators.required]),
          image: new FormControl(this.articleImage, []),
          barcode: new FormControl(this.articleBarCode, [])
        }
      );
    }


  }

  OnFormSubmitted() {
    this.matDialogRef.close(
      {
        name: this.articleForm.get('name').value,
        description: this.articleForm.get('description').value,
        price: this.articleForm.get('price').value,
        image: this.articleForm.get('image').value,
        barCode: this.articleForm.get('barcode').value,
        product: this.articleForm.get('product').value,
      }
    );
  }
}
