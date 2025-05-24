import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ProductService, Product } from '../../../../features/auctions/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule,
    RouterModule
  ],
  template: `
    <div class="product-detail-container">
      @if (product) {
        <div class="product-header">
          <h1>{{ product.name }}</h1>
          <div class="product-actions">
            <button mat-icon-button color="accent" (click)="toggleFavorite()">
              <mat-icon>{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
            </button>
            <button mat-icon-button (click)="shareProduct()">
              <mat-icon>share</mat-icon>
            </button>
          </div>
        </div>

        <div class="product-content">
          <div class="product-gallery">
            <div class="main-image">
              <img [src]="product.imageUrl" [alt]="product.name"
                   (error)="product.imageUrl = 'assets/images/placeholder.png'">
            </div>
            <div class="thumbnail-container">
              <!-- Placeholder for multiple images -->
              <div class="thumbnail active">
                <img [src]="product.imageUrl" [alt]="product.name"
                     (error)="product.imageUrl = 'assets/images/placeholder.png'">
              </div>
              <div class="thumbnail">
                <img src="assets/images/placeholder.png" alt="Placeholder">
              </div>
              <div class="thumbnail">
                <img src="assets/images/placeholder.png" alt="Placeholder">
              </div>
            </div>
          </div>

          <div class="product-info">
            <mat-card>
              <mat-card-content>
                <div class="price-section">
                  <h2 class="current-price">{{ product.currentBid | currency:'USD' }}</h2>
                  <p class="original-price" *ngIf="product.currentBid > product.startingPrice">
                    Original: {{ product.startingPrice | currency:'USD' }}
                  </p>
                </div>

                <div class="status-section">
                  <mat-chip-set>
                    <mat-chip color="primary" selected>{{ getAuctionStatus() }}</mat-chip>
                    <mat-chip color="accent" *ngIf="product.condition">{{ product.condition }}</mat-chip>
                  </mat-chip-set>
                </div>

                <mat-divider class="divider"></mat-divider>

                <div class="action-buttons">
                  <button mat-raised-button color="primary" [routerLink]="['/auctions', product.id]">
                    <mat-icon>gavel</mat-icon>
                    Bid Now
                  </button>
                  <button mat-raised-button color="accent" (click)="addToCart()">
                    <mat-icon>shopping_cart</mat-icon>
                    Buy Now
                  </button>
                </div>

                <mat-divider class="divider"></mat-divider>

                <div class="seller-info">
                  <h3>Seller Information</h3>
                  <p><strong>Seller:</strong> {{ product.seller }}</p>
                  <p><strong>Location:</strong> {{ product.location }}</p>
                  <p><strong>Rating:</strong> 
                    <span class="rating">
                      <mat-icon>star</mat-icon>
                      <mat-icon>star</mat-icon>
                      <mat-icon>star</mat-icon>
                      <mat-icon>star</mat-icon>
                      <mat-icon>star_half</mat-icon>
                      (4.5)
                    </span>
                  </p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <mat-card class="product-details-card">
          <mat-card-content>
            <mat-tab-group animationDuration="0ms">
              <mat-tab label="Description">
                <div class="tab-content">
                  <h3>Product Description</h3>
                  <p>{{ product.description }}</p>
                  
                  <h3>Product Details</h3>
                  <ul class="product-details-list">
                    <li><strong>Category:</strong> {{ product.category }}</li>
                    <li><strong>Condition:</strong> {{ product.condition }}</li>
                    <li><strong>Auction End Date:</strong> {{ product.endTime | date:'medium' }}</li>
                    <li><strong>Starting Price:</strong> {{ product.startingPrice | currency:'USD' }}</li>
                    <li><strong>Current Bid:</strong> {{ product.currentBid | currency:'USD' }}</li>
                    <li><strong>Total Bids:</strong> {{ product.totalBids }}</li>
                  </ul>
                </div>
              </mat-tab>
              <mat-tab label="Shipping">
                <div class="tab-content">
                  <h3>Shipping Information</h3>
                  <p>Standard shipping is available for this item. Delivery typically takes 3-5 business days after payment is received.</p>
                  
                  <h3>Return Policy</h3>
                  <p>Returns accepted within 30 days of delivery. Item must be in original condition with all packaging.</p>
                </div>
              </mat-tab>
              <mat-tab label="Reviews">
                <div class="tab-content">
                  <h3>Product Reviews</h3>
                  <p>No reviews yet for this product.</p>
                </div>
              </mat-tab>
            </mat-tab-group>
          </mat-card-content>
        </mat-card>

        <mat-card class="related-products-card">
          <mat-card-header>
            <mat-card-title>Related Products</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="related-products-grid">
              @for (i of [1, 2, 3, 4]; track i) {
                <div class="related-product">
                  <img src="assets/images/placeholder.png" alt="Related Product">
                  <h4>Related Product {{ i }}</h4>
                  <p>{{ 100 + i * 50 | currency:'USD' }}</p>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="loading-container">
          <p>Loading product details...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      color: #1976d2;
      margin: 0;
      font-size: 2rem;
    }

    .product-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .product-gallery {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .main-image {
      width: 100%;
      height: 400px;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }

    .main-image:hover img {
      transform: scale(1.05);
    }

    .thumbnail-container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }

    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s ease;
    }

    .thumbnail.active {
      border-color: #1976d2;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      display: flex;
      flex-direction: column;
    }

    .price-section {
      margin-bottom: 1rem;
    }

    .current-price {
      color: #1976d2;
      font-size: 2rem;
      margin: 0;
    }

    .original-price {
      color: #666;
      text-decoration: line-through;
      margin: 0.5rem 0 0 0;
    }

    .status-section {
      margin-bottom: 1rem;
    }

    .divider {
      margin: 1.5rem 0;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .action-buttons button {
      flex: 1;
    }

    .seller-info {
      margin-top: 1rem;
    }

    .seller-info h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .seller-info p {
      margin: 0.5rem 0;
    }

    .rating {
      display: flex;
      align-items: center;
      color: #ffc107;
    }

    .rating mat-icon {
      font-size: 18px;
      height: 18px;
      width: 18px;
    }

    .product-details-card,
    .related-products-card {
      margin-bottom: 2rem;
    }

    .tab-content {
      padding: 1.5rem 0;
    }

    .tab-content h3 {
      color: #1976d2;
      margin-bottom: 1rem;
    }

    .product-details-list {
      list-style-type: none;
      padding: 0;
    }

    .product-details-list li {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }

    .related-products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .related-product {
      text-align: center;
    }

    .related-product img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .related-product h4 {
      margin: 0.5rem 0;
      color: #333;
    }

    .related-product p {
      color: #1976d2;
      font-weight: bold;
      margin: 0;
    }

    .loading-container {
      text-align: center;
      padding: 3rem;
    }

    @media (max-width: 768px) {
      .product-content {
        grid-template-columns: 1fr;
      }

      .main-image {
        height: 300px;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
        this.checkIfFavorite();
      });
    }
  }

  checkIfFavorite(): void {
    if (!this.product) return;
    
    const savedFavorites = localStorage.getItem('productFavorites');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      this.isFavorite = favorites.includes(this.product.id);
    }
  }

  toggleFavorite(): void {
    if (!this.product) return;
    
    this.isFavorite = !this.isFavorite;
    
    const savedFavorites = localStorage.getItem('productFavorites');
    let favorites: string[] = [];
    
    if (savedFavorites) {
      favorites = JSON.parse(savedFavorites);
    }
    
    if (this.isFavorite) {
      if (!favorites.includes(this.product.id)) {
        favorites.push(this.product.id);
      }
    } else {
      const index = favorites.indexOf(this.product.id);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }
    
    localStorage.setItem('productFavorites', JSON.stringify(favorites));
  }

  shareProduct(): void {
    if (!this.product) return;
    
    if (navigator.share) {
      navigator.share({
        title: this.product.name,
        text: this.product.description,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => {
        console.error('Error copying to clipboard:', err);
      });
    }
  }

  addToCart(): void {
    if (!this.product) return;
    
    // Implement cart functionality here
    alert(`${this.product.name} added to cart!`);
  }

  getAuctionStatus(): string {
    if (!this.product) return '';
    
    const now = new Date();
    const endTime = new Date(this.product.endTime);
    
    if (now > endTime) {
      return 'Auction Ended';
    } else {
      return 'Active Auction';
    }
  }
}