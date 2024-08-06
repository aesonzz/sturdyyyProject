import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Controla la visibilidad del banner
  showBanner: boolean = false;

  // Inyectamos el Router y el Cart service
  // Filtra los eventos de navegación
  constructor(private router: Router, public cartService: CartService) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      // muestra el banner solo en el home
      this.showBanner = event.urlAfterRedirects === '/' || event.url === '/';
    });
  }

  // Contador de Items en el carrito

  itemCount(): number {
    return this.cartService.getItems().reduce((count, item) => count + item.quantity, 0);
  }

  // Metodo para abrir el carrito
  openCart() {
    this.cartService.openCart();
  }
}
