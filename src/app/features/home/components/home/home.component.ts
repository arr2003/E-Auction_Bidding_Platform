import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="home-container">
      <header class="hero-section">
        <h1>Welcome to E-Auction Platform</h1>
        <p>Discover unique items and bid on exciting auctions</p>
      </header>

      <section class="features-section">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Browse Products</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Explore our wide range of products available for auction</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/products">View Products</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Active Auctions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Join live auctions and place your bids</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/auctions">View Auctions</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Sell Items</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>List your items for auction and reach potential buyers</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/products/create">Start Selling</button>
          </mat-card-actions>
        </mat-card>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 3rem;
    }

    .hero-section h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #1976d2;
    }

    .hero-section p {
      font-size: 1.2rem;
      color: #666;
    }

    .features-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    mat-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-actions {
      padding: 16px;
    }
  `]
})
export class HomeComponent {}