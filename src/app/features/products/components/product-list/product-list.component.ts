import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../../features/auctions/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    RouterModule
  ],
  template: `
    <div class="products-container">
      <h1>Product Catalog</h1>
      
      <div class="filters-section">
        <mat-form-field appearance="outline">
          <mat-label>Search Products</mat-label>
          <input matInput [(ngModel)]="searchTerm" placeholder="Enter product name...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="selectedCategory">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let category of categories" [value]="category">{{ category }}</mat-option>
          </mat-select>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Sort By</mat-label>
          <mat-select [(ngModel)]="sortBy">
            <mat-option value="name">Name</mat-option>
            <mat-option value="price">Price: Low to High</mat-option>
            <mat-option value="priceDesc">Price: High to Low</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      
      <div class="products-grid">
        @for (product of filteredProducts; track product.id) {
          <mat-card class="product-card">
            <div class="image-container">
              <img mat-card-image [src]="product.imageUrl" [alt]="product.name"
                   (error)="product.imageUrl = 'assets/images/placeholder.png'">
            </div>
            <mat-card-header>
              <mat-card-title>{{ product.name }}</mat-card-title>
              <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p class="description">{{ product.description | slice:0:100 }}{{ product.description.length > 100 ? '...' : '' }}</p>
              <div class="price-info">
                <p class="price">{{ product.currentBid | currency:'USD' }}</p>
                <p class="condition">Condition: {{ product.condition }}</p>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" [routerLink]="['/products', product.id]">
                <mat-icon>visibility</mat-icon>
                View Details
              </button>
              <button mat-icon-button color="accent" (click)="toggleFavorite(product)">
                <mat-icon>{{ isFavorite(product) ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>
        }
        
        @if (filteredProducts.length === 0) {
          <div class="no-products">
            <mat-icon>search_off</mat-icon>
            <p>No products found matching your criteria</p>
            <button mat-raised-button color="primary" (click)="resetFilters()">
              Reset Filters
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: #1976d2;
      margin-bottom: 2rem;
      text-align: center;
    }

    .filters-section {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
      background-color: #f5f5f5;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    mat-form-field {
      flex: 1;
      min-width: 200px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .image-container {
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    }

    .product-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover img {
      transform: scale(1.05);
    }

    .description {
      color: #666;
      margin-bottom: 1rem;
      height: 3em;
      overflow: hidden;
    }

    .price-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .price {
      color: #1976d2;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0;
    }

    .condition {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }

    mat-card-actions {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      padding: 8px 16px 16px;
    }

    .no-products {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .no-products mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #bdbdbd;
      margin-bottom: 1rem;
    }

    .no-products p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      }
    }

    @media (max-width: 480px) {
      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = 'name';
  categories: string[] = [];
  favorites: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.extractCategories();
      this.applyFilters();
    });

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('productFavorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  }

  extractCategories(): void {
    const uniqueCategories = new Set<string>();
    this.products.forEach(product => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    this.categories = Array.from(uniqueCategories);
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'price') {
        return a.currentBid - b.currentBid;
      } else if (this.sortBy === 'priceDesc') {
        return b.currentBid - a.currentBid;
      }
      return 0;
    });

    this.filteredProducts = filtered;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortBy = 'name';
    this.applyFilters();
  }

  toggleFavorite(product: Product): void {
    const index = this.favorites.indexOf(product.id);
    if (index === -1) {
      this.favorites.push(product.id);
    } else {
      this.favorites.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('productFavorites', JSON.stringify(this.favorites));
  }

  isFavorite(product: Product): boolean {
    return this.favorites.includes(product.id);
  }
}