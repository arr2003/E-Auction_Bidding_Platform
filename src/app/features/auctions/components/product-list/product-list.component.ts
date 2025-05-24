import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

// Using Product interface from ProductService
// The interface includes additional fields like startingPrice, seller, category, and condition

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="products-container">
      <h1>Products Available for Auction</h1>
      
      <div class="products-grid">
        @for (product of products; track product.id) {
          <mat-card class="product-card">
            <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
            <mat-card-header>
              <mat-card-title>{{ product.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ product.description }}</p>
              <div class="bid-info">
                <p class="current-bid" *ngIf="product?.currentBid !== undefined">
                  Current Bid: {{ product.currentBid | currency:'USD' }}
                </p>
                <p class="time-remaining">Ends: {{ product.endTime | date:'medium' }}</p>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" [routerLink]="['/auctions', product.id]">
                View Details
              </button>
              <button mat-raised-button color="accent">
                Place Bid
              </button>
            </mat-card-actions>
          </mat-card>
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

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .product-card img {
      height: 200px;
      object-fit: cover;
    }

    .bid-info {
      margin-top: 1rem;
    }

    .current-bid {
      color: #1976d2;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .time-remaining {
      color: #666;
      font-size: 0.9rem;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      gap: 8px;
      justify-content: space-between;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}