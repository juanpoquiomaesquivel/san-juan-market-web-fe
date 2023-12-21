import { Component } from '@angular/core';
import { AdministratorService } from '../Services/administrator.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
  providers: [AdministratorService]
})
export class AdministratorComponent {
  routes: any = [
    {link: 'categories', name: 'Categorías'},
    {link: 'products', name: 'Productos'},
    {link: 'articles', name: 'Artículos'},
  ]
}
