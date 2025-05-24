import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    RouterModule
  ],
  template: `
    <div class="auctions-container">
      <div class="auctions-header">
        <h1>Active Auctions</h1>
        <div class="filter-controls">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search auctions</mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Search by name or description">
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
            <mat-select [(ngModel)]="sortOption">
              <mat-option value="endTime">Ending Soon</mat-option>
              <mat-option value="currentBid">Current Bid (Low to High)</mat-option>
              <mat-option value="currentBidDesc">Current Bid (High to Low)</mat-option>
              <mat-option value="totalBids">Most Bids</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
      
      <div class="auctions-grid">
        @for (product of filteredProducts; track product.id) {
          <mat-card class="auction-card">
            <div class="auction-image">
              <img [src]="product.imageUrl" [alt]="product.name">
              <div class="time-remaining" [ngClass]="getTimeRemainingClass(product)">
                {{ getTimeRemaining(product) }}
              </div>
            </div>
            
            <mat-card-content>
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-description">{{ product.description }}</p>
              
              <div class="bid-info">
                <div class="current-bid">
                  <span class="label">Current Bid:</span>
                  <span class="value">{{ product.currentBid | currency:'USD' }}</span>
                </div>
                <div class="bid-count">
                  <mat-icon>gavel</mat-icon>
                  <span>{{ product.totalBids }} bids</span>
                </div>
              </div>
              
              <div class="seller-info">
                <span class="label">Seller:</span>
                <span class="value">{{ product.seller }}</span>
              </div>
              
              <div class="product-meta">
                <div class="category">
                  <mat-chip>{{ product.category }}</mat-chip>
                </div>
                <div class="condition">
                  <mat-chip>{{ product.condition }}</mat-chip>
                </div>
              </div>
            </mat-card-content>
            
            <mat-card-actions>
              <button mat-raised-button color="primary" [routerLink]="['/auctions', product.id]">
                <mat-icon>visibility</mat-icon>
                View Details
              </button>
              <button mat-raised-button color="accent" (click)="navigateToBid(product.id)">
                <mat-icon>gavel</mat-icon>
                Place Bid
              </button>
            </mat-card-actions>
          </mat-card>
        }
        
        @if (filteredProducts.length === 0) {
          <div class="no-results">
            <mat-icon>search_off</mat-icon>
            <p>No auctions found matching your criteria</p>
            <button mat-raised-button color="primary" (click)="resetFilters()">
              Reset Filters
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .auctions-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    .auctions-header {
      margin-bottom: 2rem;
      
      h1 {
        color: #1976d2;
        margin-bottom: 1.5rem;
      }
    }
    
    .filter-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
      
      .search-field {
        flex: 1;
        min-width: 250px;
      }
      
      mat-form-field {
        min-width: 200px;
      }
    }
    
    .auctions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .auction-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.2s, box-shadow 0.2s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }
    }
    
    .auction-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .time-remaining {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.5rem 1rem;
        color: white;
        font-weight: bold;
        font-size: 0.9rem;
        
        &.ending-soon {
          background-color: #f44336;
        }
        
        &.ending-today {
          background-color: #ff9800;
        }
        
        &.days-remaining {
          background-color: #4caf50;
        }
      }
    }
    
    .product-name {
      margin: 1rem 0 0.5rem;
      font-size: 1.2rem;
      color: #333;
    }
    
    .product-description {
      color: #666;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .bid-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      
      .current-bid {
        .label {
          color: #666;
          font-size: 0.9rem;
        }
        
        .value {
          color: #1976d2;
          font-weight: bold;
          font-size: 1.2rem;
          margin-left: 0.5rem;
        }
      }
      
      .bid-count {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 0.9rem;
        
        mat-icon {
          font-size: 18px;
          height: 18px;
          width: 18px;
          margin-right: 0.25rem;
        }
      }
    }
    
    .seller-info {
      margin-bottom: 0.5rem;
      
      .label {
        color: #666;
        font-size: 0.9rem;
      }
      
      .value {
        color: #333;
        margin-left: 0.5rem;
      }
    }
    
    .product-meta {
      display: flex;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    
    mat-card-actions {
      margin-top: auto;
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      
      button {
        flex: 1;
      }
    }
    
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      background-color: #f5f5f5;
      border-radius: 8px;
      
      mat-icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        color: #bdbdbd;
        margin-bottom: 1rem;
      }
      
      p {
        color: #666;
        margin-bottom: 1.5rem;
      }
    }
    
    @media (max-width: 768px) {
      .auctions-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
      
      .filter-controls {
        flex-direction: column;
        align-items: stretch;
        
        mat-form-field {
          width: 100%;
        }
      }
    }
  `]
})
export class AuctionComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortOption: string = 'endTime';
  categories: string[] = [];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      
      // Extract unique categories
      this.categories = [...new Set(products.map(p => p.category))];
      
      // Apply default sorting
      this.applySorting();
    });
  }
  
  getTimeRemaining(product: Product): string {
    const now = new Date();
    const endTime = new Date(product.endTime);
    const diffTime = endTime.getTime() - now.getTime();
    
    if (diffTime <= 0) {
      return 'Auction ended';
    }
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m remaining`;
    } else {
      return `${diffMinutes}m remaining`;
    }
  }
  
  getTimeRemainingClass(product: Product): string {
    const now = new Date();
    const endTime = new Date(product.endTime);
    const diffTime = endTime.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffTime <= 0) {
      return 'ended';
    } else if (diffHours < 6) {
      return 'ending-soon';
    } else if (diffDays === 0) {
      return 'ending-today';
    } else {
      return 'days-remaining';
    }
  }
  
  navigateToBid(productId: string): void {
    // Navigate to product detail page with bid section focused
    // This would typically use Router.navigate with fragment
    window.location.href = `/auctions/${productId}#bid-section`;
  }
  
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortOption = 'endTime';
    this.applyFilters();
  }
  
  applyFilters(): void {
    // Filter by search term
    let filtered = this.products;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    
    this.filteredProducts = filtered;
    this.applySorting();
  }
  
  applySorting(): void {
    switch (this.sortOption) {
      case 'endTime':
        this.filteredProducts.sort((a, b) => 
          new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
        );
        break;
      case 'currentBid':
        this.filteredProducts.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case 'currentBidDesc':
        this.filteredProducts.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case 'totalBids':
        this.filteredProducts.sort((a, b) => b.totalBids - a.totalBids);
        break;
    }
  }
}