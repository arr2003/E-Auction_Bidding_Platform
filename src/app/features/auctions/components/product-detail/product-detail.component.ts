import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { BidHistoryComponent } from '../bid-history/bid-history.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    BidHistoryComponent
  ],
  template: `
    <div class="product-detail-container">
      @if (product) {
        <mat-card class="product-detail-card">
          <div class="image-container">
            <img mat-card-image 
              [src]="product.imageUrl" 
              [alt]="product.name"
              (error)="product.imageUrl = '/assets/images/placeholder.png'"
              loading="lazy">
          </div>
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="product-info">
              <h3>Product Details</h3>
              <p>{{ product.description }}</p>
              
              <div class="bid-details">
                <div class="bid-info">
                  <h3>Auction Status</h3>
                  <mat-progress-bar mode="determinate" [value]="getAuctionProgress()"></mat-progress-bar>
                  <p class="time-remaining"><strong>Time Remaining:</strong> {{ getTimeRemaining() }}</p>
                  <p class="current-bid"><strong>Current Bid:</strong> {{ product.currentBid | currency:'USD' }}</p>
                  <p><strong>Starting Price:</strong> {{ product.startingPrice | currency:'USD' }}</p>
                  <p><strong>Total Bids:</strong> {{ getTotalBids() }}</p>
                </div>
                
                <div class="seller-info">
                  <h3>Item Information</h3>
                  <p><strong>Seller:</strong> {{ product.seller }}</p>
                  <p><strong>Condition:</strong> {{ product.condition }}</p>
                  <p><strong>Category:</strong> {{ product.category }}</p>
                  <p><strong>Location:</strong> {{ getSellerLocation() }}</p>
                </div>
              </div>

              <div class="place-bid-section">
                <h3>Place Your Bid</h3>
                <mat-form-field appearance="outline">
                  <mat-label>Bid Amount ($)</mat-label>
                  <input matInput type="number" [(ngModel)]="bidAmount" [min]="product.currentBid + 1">
                  <mat-hint>Minimum bid: {{ product.currentBid + 1 | currency:'USD' }}</mat-hint>
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="placeBid()" [disabled]="!isValidBid() || isAuctionEnded()">
                  {{ isAuctionEnded() ? 'Auction Ended' : 'Place Bid' }}
                </button>
              </div>

              <app-bid-history [productId]="product.id"></app-bid-history>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <p>Loading product details...</p>
      }
    </div>
  `,
  styles: [`
    .product-detail-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .product-detail-card {
      margin-bottom: 2rem;
    }

    .product-detail-card img {
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      background: #f5f5f5;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .product-detail-card img:hover {
      transform: scale(1.02);
    }

    .image-container {
      position: relative;
      width: 100%;
      min-height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
    }

    .product-info {
      padding: 1rem 0;
    }

    .bid-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin: 2rem 0;
      padding: 1.5rem;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      h3 {
        margin-bottom: 1rem;
        color: #1976d2;
      }
    }

    .bid-info, .seller-info {
      p {
        margin: 0.5rem 0;
      }
    }

    .place-bid-section {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;

      h3 {
        margin-bottom: 1rem;
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 1rem;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  // Removed hardcoded image path
  product?: Product;
  bidAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
        if (product) {
          this.bidAmount = product.currentBid + 1;
        }
      });
    }
  }

  isValidBid(): boolean {
    return this.product ? this.bidAmount > this.product.currentBid && !this.isAuctionEnded() : false;
  }

  isAuctionEnded(): boolean {
    return this.product ? new Date() > new Date(this.product.endTime) : false;
  }

  getTimeRemaining(): string {
    if (!this.product) return '';
    
    const now = new Date();
    const end = new Date(this.product.endTime);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Auction Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  }

  getAuctionProgress(): number {
    if (!this.product) return 0;
    
    const start = new Date(this.product.endTime);
    start.setDate(start.getDate() - 7); // Assuming 7-day auction period
    const now = new Date();
    const end = new Date(this.product.endTime);
    
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  getTotalBids(): number {
    return this.product?.totalBids || 0;
  }

  getSellerLocation(): string {
    return this.product?.location || 'Location not available';
  }

  placeBid(): void {
    if (!this.product) {
      this.snackBar.open('Product not found', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (!this.isValidBid()) {
      this.snackBar.open(`Bid must be higher than ${this.product.currentBid}`, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.isAuctionEnded()) {
      this.snackBar.open('This auction has ended', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.productService.placeBid(this.product.id, this.bidAmount).subscribe({
      next: (success) => {
        if (success) {
          this.product!.currentBid = this.bidAmount;
          this.bidAmount = this.product!.currentBid + 1;
          this.snackBar.open('Bid placed successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        } else {
          this.snackBar.open('Failed to place bid. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (error) => {
        this.snackBar.open('An error occurred while placing your bid. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}