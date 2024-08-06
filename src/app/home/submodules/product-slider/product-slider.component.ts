import { Component, OnInit } from '@angular/core';

interface Product {
  image: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})

// Array con los productos para el slider
export class ProductSliderComponent implements OnInit {
  products: Product[] = [
    { image: 'assets/images/hoodie.webp', name: 'K-OLLAGE', price: 59 },
    { image: 'assets/images/hoodie3.webp', name: 'KLASSY LIGHT', price: 59 },
    { image: 'assets/images/hoodie5.webp', name: 'MISSING PUSSY', price: 59 },
    { image: 'assets/images/hoodie4.webp', name: 'KUSH KLONE', price: 59 },
    { image: 'assets/images/hoodie2.webp', name: 'MELODY KISSES', price: 49 },
    { image: 'assets/images/knit1.webp', name: 'WHO IS HIM?', price: 39 },
    { image: 'assets/images/knit2.webp', name: 'WHO IS HER?', price: 39 },
    { image: 'assets/images/puffer1.webp', name: 'PFF MICHELIN', price: 99 },
  ];

  // Primer producto visible, cuantos se verán y el estilo para tranformar la posición
  currentIndex: number = 0;
  totalVisible: number = 4;
  transformStyle: string = 'translateX(0)';

  constructor() { }

  ngOnInit(): void { }

  // Métodos para el movimiento de derecha, izquierda y de transformación 


  slideLeft(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.updateTransformStyle();
  }

  slideRight(): void {
    if (this.currentIndex < this.products.length - this.totalVisible) {
      this.currentIndex++;
    }
    this.updateTransformStyle();
  }

  updateTransformStyle(): void {
    this.transformStyle = `translateX(-${this.currentIndex * (100 / this.totalVisible)}%)`;
  }
}
