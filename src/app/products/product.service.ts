import { Injectable } from '@angular/core';

// interfaz de producto

interface Product {
  image: string;
  name: string;
  price: number;
  color: string;
  sizes: string[];
  thumbnails: string[];
  category: string;
  quantity: number;
}



// el array con los productos y las características que los componen, ademas de las thumbanils para el product detail

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { image: 'assets/images/hoodie.webp', name: 'K-OLLAGE', price: 59, color: 'Black', sizes: ['M', 'L', 'XL'],  thumbnails: ['assets/images/hoodie.webp', 'assets/images/thumbs/hoodie.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/hoodie3.webp', name: 'KLASSY LIGHT', price: 59, color: 'White', sizes: ['M', 'L', 'XL'],  thumbnails: ['assets/images/hoodie3.webp', 'assets/images/thumbs/hoodie3.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/hoodie5.webp', name: 'MISSING PUSSY', price: 59, color: 'Grey', sizes: ['M', 'L', 'XL'],  thumbnails: ['assets/images/hoodie5.webp', 'assets/images/thumbs/hoodie5.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/hoodie4.webp', name: 'KUSH KLONE', price: 59, color: 'Green', sizes: ['M', 'L', 'XL'],  thumbnails: ['assets/images/hoodie4.webp', 'assets/images/thumbs/hoodie4.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/hoodie2.webp', name: 'MELODY KISSES', price: 49, color: 'Pink', sizes: ['M', 'L', 'XL'],  thumbnails: ['assets/images/hoodie2.webp', 'assets/images/thumbs/hoodie2.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/knit1.webp', name: 'WHO IS HIM', price: 39, color: 'Black', sizes: ['S', 'M', 'L'],  thumbnails: ['assets/images/knit1.webp', 'assets/images/thumbs/knit1.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/knit2.webp', name: 'WHO IS HER', price: 39, color: 'Pink', sizes: ['S', 'M'],  thumbnails: ['assets/images/knit2.webp', 'assets/images/thumbs/knit2.webp'], category: 'Hoodies', quantity: 1 },
    { image: 'assets/images/puffer1.webp', name: 'PFF MICHELIN', price: 99, color: 'Black', sizes: ['L', 'XL'],  thumbnails: ['assets/images/puffer1.webp', 'assets/images/thumbs/puffer1.webp'], category: 'Jackets', quantity: 1 },
    { image: 'assets/images/tshirt1.webp', name: 'PUSSY CAUTION', price: 29, color: 'Black', sizes: ['S', 'M', 'L', 'XL'],  thumbnails: ['assets/images/tshirt1.webp', 'assets/images/thumbs/tshirt1.webp'], category: 'T-Shirts', quantity: 1 },
    { image: 'assets/images/tshirt2.webp', name: 'PUSSY CAUTION 2', price: 29, color: 'White', sizes: ['S','M','L', 'XL'],  thumbnails: ['assets/images/tshirt2.webp', 'assets/images/thumbs/tshirt2.webp'], category: 'T-Shirts', quantity: 1 },
    { image: 'assets/images/tshirt3.webp', name: 'FRESH JUICES', price: 20, color: 'White', sizes: ['S','M','L', 'XL'],  thumbnails: ['assets/images/tshirt3.webp', 'assets/images/thumbs/tshirt3.webp'], category: 'T-Shirts', quantity: 1 },
    { image: 'assets/images/tshirt4.webp', name: 'FRESH AIR', price: 20, color: 'White', sizes: ['S', 'M', 'L', 'XL'],  thumbnails: ['assets/images/tshirt4.webp', 'assets/images/thumbs/tshirt4.webp'], category: 'T-Shirts', quantity: 1 },
    { image: 'assets/images/wallet1.webp', name: 'NOT A WALLET', price: 20, color: 'Blue', sizes: ['S'],  thumbnails: ['assets/images/wallet1.webp', 'assets/images/thumbs/wallet1.webp'], category: 'Accesories', quantity: 1 },
    { image: 'assets/images/bag1.webp', name: 'BINOCULARS BAG', price: 95, color: 'Pink', sizes: ['S'],  thumbnails: ['assets/images/bag1.webp', 'assets/images/thumbs/bag1.webp'], category: 'Accesories', quantity: 1 },
    { image: 'assets/images/meter1.webp', name: 'NECESSARY METER', price: 25, color: 'Yellow', sizes: ['S', 'M', 'L', 'XL'],  thumbnails: ['assets/images/meter1.webp', 'assets/images/thumbs/meter1.webp'], category: 'Accesories', quantity: 1 },
  ];

  constructor() { }


  // Este método es para buscar el producto por el nombre

  getProductByName(name: string): Product | undefined {
    return this.products.find(product => product.name === name);
  }
}
