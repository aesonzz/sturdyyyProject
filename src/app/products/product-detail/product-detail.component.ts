import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

interface Product {
  id?: number;
  image: string;
  name: string;
  price: number;
  color: string;
  sizes: string[];
  thumbnails: string[];
  category: string;
  description?: string;
  quantity: number;
  selectedSize?: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product | undefined;
  mainImageUrl: string | undefined;
  selectedSize: string | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }


  // llamamos al producto deseado por el nombre, lo busca y carga la imagen del mismo
  ngOnInit(): void {
    const productName = this.route.snapshot.paramMap.get('name');
    if (productName) {
      this.product = this.productService.getProductByName(productName);
      this.mainImageUrl = this.product?.image;
    }
  }

  // metodo para elegir la talla

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  // método para cambiar la imagen de la miniatura

  changeMainImage(thumb: string): void {
    this.mainImageUrl = thumb;
  }

  // método para añadir al carrito los productos
  addToCart(): void {
    if (this.product && this.selectedSize) {
      const item = { ...this.product, selectedSize: this.selectedSize, quantity: 1 };
      this.cartService.addItem(item);
      this.cartService.openCart();
    } else {
      alert('Please select a size');
    }
  }
}
