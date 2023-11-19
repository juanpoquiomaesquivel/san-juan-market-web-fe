import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private year: number = new Date().getFullYear();
  protected copyright: string = '© Copyright ' + this.year + ' Juan Poquioma Esquivel';
}
