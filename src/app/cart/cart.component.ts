import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // Permanece cerrado, y controla items 0 de inicio
  isOpen = false;
  cartItems: any[] = [];
  total = 0;

  constructor(public cartService: CartService, private router: Router) { }

  // Iniciamos el servicio del carrito, lo abrimos y mostramos los items
  ngOnInit() {
    this.cartService.isOpen$.subscribe((isOpen: boolean) => this.isOpen = isOpen);
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }
  // Método para el ruteo del checkout
  goToCheckout() {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }

  // Métodos para cerrar el carrito, incremento de items, decremento, eliminación y total
  closeCart() {
    this.cartService.closeCart();
  }

  increment(item: any) {
    item.quantity++;
    this.cartService.updateItem(item);
    this.calculateTotal();
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateItem(item);
      this.calculateTotal();
    }
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
