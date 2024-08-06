import { CheckoutService } from './services/checkout.service';
import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  email = '';
  discountCode = '';
  total = 0;
  discountApplied = false;
  discountError = '';
  cartItems: any[] = [];
  isDiscountUsed = false;

  private cartStore = inject(CartService);
  private readonly _checkoutSvc = inject(CheckoutService);

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }


  // Método para calcular el precio
  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Método para el descuento, la comprobación del mismo y el error
  applyDiscount() {
    if (this.isDiscountUsed) {
      this.discountError = 'Discount has already been used';
      return;
    }

    if (this.discountCode === 'STURDYYY10') {
      this.total = this.total * 0.9;
      this.discountApplied = true;
      this.discountError = '';
      this.isDiscountUsed = true;
    } else {
      this.discountError = 'Invalid discount code';
      this.discountApplied = false;
    }
  }

  //Método para eliminar items

  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }
  //Métodos para incrementar y decrementar items y actualizar el total
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

  // Método para proceder al pago y ajustar el precio según el descuento
  // Llama al servicio para proceder al pago
  onProceedToPay() {
    const totalAdjustedItems = this.cartItems.map(item => ({
      ...item,
      price: item.price * (this.discountApplied ? 0.9 : 1)
    }));
    this._checkoutSvc.onProceedToPay(totalAdjustedItems);
  }
}
