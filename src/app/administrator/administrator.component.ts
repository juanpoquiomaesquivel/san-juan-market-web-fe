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
    {link: 'administrator-categories', name: 'Administrador de categorías'},
    {link: 'administrator-products', name: 'Administrador de productos'},
    {link: 'administrator-articles', name: 'Administrador de artículos'},
  ]
}
