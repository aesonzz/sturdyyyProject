import { Component, OnInit } from '@angular/core';

interface Product {
  image: string;
  name: string;
  price: number;
  color: string;
  sizes: string[];
  category: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    { image: 'assets/images/hoodie.webp', name: 'K-OLLAGE', price: 59, color: 'Black', sizes: ['M', 'L', 'XL'], category: 'Hoodies' },
    { image: 'assets/images/hoodie3.webp', name: 'KLASSY LIGHT', price: 59, color: 'White', sizes: ['M', 'L', 'XL'], category: 'Hoodies' },
    { image: 'assets/images/hoodie5.webp', name: 'MISSING PUSSY', price: 59, color: 'Grey', sizes: ['M', 'L', 'XL'], category: 'Hoodies' },
    { image: 'assets/images/hoodie4.webp', name: 'KUSH KLONE', price: 59, color: 'Green', sizes: ['M', 'L', 'XL'], category: 'Hoodies' },
    { image: 'assets/images/hoodie2.webp', name: 'MELODY KISSES', price: 49, color: 'Pink', sizes: ['M', 'L', 'XL'], category: 'Hoodies' },
    { image: 'assets/images/knit1.webp', name: 'WHO IS HIM', price: 39, color: 'Black', sizes: ['S', 'M', 'L'], category: 'Hoodies' },
    { image: 'assets/images/knit2.webp', name: 'WHO IS HER', price: 39, color: 'Pink', sizes: ['S', 'M'], category: 'Hoodies' },
    { image: 'assets/images/puffer1.webp', name: 'PFF MICHELIN', price: 99, color: 'Black', sizes: ['L', 'XL'], category: 'Jackets' },
    { image: 'assets/images/tshirt1.webp', name: 'PUSSY CAUTION', price: 29, color: 'Black', sizes: ['S', 'M', 'L', 'XL'], category: 'T-Shirts' },
    { image: 'assets/images/tshirt2.webp', name: 'PUSSY CAUTION 2', price: 29, color: 'White', sizes: ['S','M','L', 'XL'], category: 'T-Shirts' },
    { image: 'assets/images/tshirt3.webp', name: 'FRESH JUICES', price: 20, color: 'White', sizes: ['S','M','L', 'XL'], category: 'T-Shirts' },
    { image: 'assets/images/tshirt4.webp', name: 'FRESH AIR', price: 20, color: 'White', sizes: ['S', 'M', 'L', 'XL'], category: 'T-Shirts' },
    { image: 'assets/images/wallet1.webp', name: 'NOT A WALLET', price: 20, color: 'Blue', sizes: [], category: 'Accesories' },
    { image: 'assets/images/bag1.webp', name: 'BINOCULARS BAG', price: 95, color: 'Pink', sizes: [], category: 'Accesories' },
    { image: 'assets/images/meter1.webp', name: 'NECESSARY METER', price: 25, color: 'Yellow', sizes: ['S', 'M', 'L', 'XL'], category: 'Accesories' },
  ];

  // Array para los productos y los filtros
  filteredProducts: Product[] = [...this.products];
  selectedSizes: string[] = [];
  selectedColors: string[] = [];
  selectedCategory: string = 'All';
  sortBy: string = 'featured';

  uniqueSizes: string[] = [...new Set(this.products.flatMap(p => p.sizes))];
  uniqueColors: string[] = [...new Set(this.products.map(p => p.color))];
  uniqueCategories: string[] = [...new Set(this.products.map(p => p.category))];
  router: any;

  constructor() { }

  ngOnInit(): void {
    this.applyFilters();
  }

  // este método se encarga de aplicar los filtros
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSize = this.selectedSizes.length === 0 || product.sizes.some(size => this.selectedSizes.includes(size));
      const matchesColor = this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      return matchesSize && matchesColor && matchesCategory;
    });
  }

  // este método se encarga de limpiar el filtro
  clearFilters(): void {
    this.selectedSizes = [];
    this.selectedColors = [];
    this.selectedCategory = 'All';
    this.sortBy = 'featured';
    this.applyFilters();
  }

  // este método ordena por precio
  sortProducts(): void {
    if (this.sortBy === 'priceLowToHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceHighToLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
  
  // método para navegar al product detail
  goToProductDetail(product: Product): void {
    this.router.navigate(['/product', product.name]);
  }

}
