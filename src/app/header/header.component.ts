import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'laliguria-frontend';

  currentRoute: string = '';

  constructor(private router: Router) { }

  routes: any = [
    { link: 'home', name: 'Inicio', icon: 'bi bi-house-door-fill' },
    { link: 'market-place', name: 'Tienda', icon: 'bi bi-cart-fill' },
    { link: 'administrator', name: 'Administrador', icon: 'bi bi-tools' }
  ]
}
