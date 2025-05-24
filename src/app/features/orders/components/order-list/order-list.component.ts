import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

interface Order {
  id: string;
  productName: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RouterModule
  ],
  template: `
    <div class="orders-container">
      <h1>My Orders</h1>
      
      <div class="orders-list">
        @for (order of orders; track order.id) {
          <mat-card class="order-card">
            <mat-card-header>
              <mat-card-title>Order #{{ order.id }}</mat-card-title>
              <mat-card-subtitle>{{ order.orderDate | date:'medium' }}</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <div class="order-details">
                <div class="order-info">
                  <h3>{{ order.productName }}</h3>
                  <p class="amount">Total: {{ order.totalAmount | currency:'USD' }}</p>
                  <p class="shipping">Shipping to: {{ order.shippingAddress }}</p>
                  <p class="payment">Payment: {{ order.paymentMethod }}</p>
                </div>

                <div class="order-status">
                  <mat-chip-set>
                    <mat-chip [ngClass]="order.status">
                      {{ order.status | titlecase }}
                    </mat-chip>
                  </mat-chip-set>
                  @if (order.trackingNumber) {
                    <p class="tracking">Tracking #: {{ order.trackingNumber }}</p>
                  }
                </div>
              </div>

              <mat-divider></mat-divider>

              <div class="order-actions">
                <button mat-button color="primary" [routerLink]="['/orders', order.id]">
                  <mat-icon>visibility</mat-icon>
                  View Details
                </button>
                @if (order.status === 'delivered') {
                  <button mat-button color="accent">
                    <mat-icon>rate_review</mat-icon>
                    Write Review
                  </button>
                }
              </div>
            </mat-card-content>
          </mat-card>
        }

        @if (!orders.length) {
          <mat-card class="empty-state">
            <mat-card-content>
              <mat-icon>shopping_cart</mat-icon>
              <p>No orders found</p>
              <button mat-raised-button color="primary" routerLink="/auctions">
                Browse Auctions
              </button>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h1 {
      color: #1976d2;
      margin-bottom: 2rem;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .order-card {
      border-left: 4px solid #1976d2;
    }

    .order-details {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      gap: 2rem;
    }

    .order-info {
      flex: 1;

      h3 {
        margin: 0 0 0.5rem;
        color: #333;
      }

      p {
        margin: 0.25rem 0;
        color: #666;
      }

      .amount {
        font-weight: 500;
        color: #1976d2;
      }
    }

    .order-status {
      text-align: right;

      .tracking {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #666;
      }
    }

    mat-chip {
      &.pending {
        background-color: #ffd740;
      }
      &.processing {
        background-color: #69f0ae;
      }
      &.shipped {
        background-color: #2196f3;
        color: white;
      }
      &.delivered {
        background-color: #4caf50;
        color: white;
      }
    }

    .order-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;

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
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [
    {
      id: 'ORD001',
      productName: 'Vintage Watch Collection',
      orderDate: new Date('2024-01-15'),
      status: 'delivered',
      totalAmount: 1299.99,
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD002',
      productName: 'Antique Furniture Set',
      orderDate: new Date('2024-01-20'),
      status: 'shipped',
      totalAmount: 2499.99,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD003',
      productName: 'Art Deco Lamp',
      orderDate: new Date('2024-01-25'),
      status: 'processing',
      totalAmount: 599.99,
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      paymentMethod: 'Credit Card'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}