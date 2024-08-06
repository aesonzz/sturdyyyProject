import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Controlamos el estado cerrado del carrito y el almacenamiento de los items
  private cartItems = new BehaviorSubject<any[]>([]);
  private isOpen = new BehaviorSubject<boolean>(false);


  //Los observables anteriores
  cartItems$ = this.cartItems.asObservable();
  isOpen$ = this.isOpen.asObservable();

  //Array para el almacenamiento
  private items: any[] = [];

  // Métodos para obetener los artículos, añadir ítems y ver si ya había alguno y eliminarlos
  getItems() {
    return this.items;
  }

  addItem(item: any) {
    const existingItemIndex = this.items.findIndex(i => i.name === item.name && i.selectedSize === item.selectedSize);
    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.cartItems.next(this.items);
  }

  updateItem(updatedItem: any) {
    const index = this.items.findIndex(item => item.name === updatedItem.name && item.selectedSize === updatedItem.selectedSize);
    if (index > -1) {
      this.items[index] = updatedItem;
      this.cartItems.next(this.items);
    }
  }

  removeItem(item: any) {
    this.items = this.items.filter(i => !(i.name === item.name && i.selectedSize === item.selectedSize));
    this.cartItems.next(this.items);
  }

  // Métodos para abrir y cerrar el carrito

  openCart() {
    this.isOpen.next(true);
  }

  closeCart() {
    this.isOpen.next(false);
  }
}
