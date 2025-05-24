import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

interface OrderDetail {
  id: string;
  productName: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  seller: string;
  estimatedDelivery?: Date;
  orderSteps: {
    step: string;
    completed: boolean;
    date?: Date;
  }[];
}

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDividerModule,
    RouterModule
  ],
  template: `
    <div class="order-detail-container">
      <div class="back-button">
        <button mat-button color="primary" routerLink="/orders">
          <mat-icon>arrow_back</mat-icon>
          Back to Orders
        </button>
      </div>

      <mat-card class="order-detail-card">
        <mat-card-header>
          <mat-card-title>Order #{{ order.id }}</mat-card-title>
          <mat-card-subtitle>Placed on {{ order.orderDate | date:'medium' }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="order-info-grid">
            <div class="info-section">
              <h3>Order Details</h3>
              <p><strong>Product:</strong> {{ order.productName }}</p>
              <p><strong>Seller:</strong> {{ order.seller }}</p>
              <p><strong>Total Amount:</strong> {{ order.totalAmount | currency:'USD' }}</p>
              <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
            </div>

            <mat-divider [vertical]="true"></mat-divider>

            <div class="info-section">
              <h3>Shipping Information</h3>
              <p><strong>Address:</strong> {{ order.shippingAddress }}</p>
              @if (order.trackingNumber) {
                <p><strong>Tracking Number:</strong> {{ order.trackingNumber }}</p>
              }
              @if (order.estimatedDelivery) {
                <p><strong>Estimated Delivery:</strong> {{ order.estimatedDelivery | date:'mediumDate' }}</p>
              }
            </div>
          </div>

          <div class="order-timeline">
            <h3>Order Timeline</h3>
            <mat-stepper orientation="vertical" [linear]="true">
              @for (step of order.orderSteps; track step.step) {
                <mat-step [completed]="step.completed">
                  <ng-template matStepLabel>
                    <div class="step-label">
                      {{ step.step }}
                      @if (step.date) {
                        <span class="step-date">{{ step.date | date:'medium' }}</span>
                      }
                    </div>
                  </ng-template>
                </mat-step>
              }
            </mat-stepper>
          </div>

          <mat-divider></mat-divider>

          <div class="order-actions">
            @if (order.status === 'delivered') {
              <button mat-raised-button color="accent">
                <mat-icon>rate_review</mat-icon>
                Write a Review
              </button>
            }
            <button mat-raised-button color="primary">
              <mat-icon>help</mat-icon>
              Need Help?
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .order-detail-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .back-button {
      margin-bottom: 1rem;
    }

    .order-detail-card {
      margin-bottom: 2rem;
    }

    .order-info-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 2rem;
      margin: 2rem 0;
    }

    .info-section {
      h3 {
        color: #1976d2;
        margin: 0 0 1rem;
      }

      p {
        margin: 0.5rem 0;
        color: #333;

        strong {
          color: #666;
          margin-right: 0.5rem;
        }
      }
    }

    .order-timeline {
      margin: 2rem 0;

      h3 {
        color: #1976d2;
        margin-bottom: 1.5rem;
      }
    }

    .step-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .step-date {
        font-size: 0.9rem;
        color: #666;
      }
    }

    .order-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    ::ng-deep {
      .mat-step-header .mat-step-icon-selected {
        background-color: #1976d2;
      }

      .mat-step-header .mat-step-icon-state-done {
        background-color: #4caf50;
      }
    }
  `]
})
export class OrderDetailComponent implements OnInit {
  order: OrderDetail = {
    id: 'ORD001',
    productName: 'Vintage Watch Collection',
    orderDate: new Date('2024-01-15'),
    status: 'shipped',
    totalAmount: 1299.99,
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
    seller: 'Antique Treasures Ltd',
    estimatedDelivery: new Date('2024-02-01'),
    orderSteps: [
      {
        step: 'Order Placed',
        completed: true,
        date: new Date('2024-01-15')
      },
      {
        step: 'Payment Confirmed',
        completed: true,
        date: new Date('2024-01-15')
      },
      {
        step: 'Processing',
        completed: true,
        date: new Date('2024-01-16')
      },
      {
        step: 'Shipped',
        completed: true,
        date: new Date('2024-01-18')
      },
      {
        step: 'Out for Delivery',
        completed: false
      },
      {
        step: 'Delivered',
        completed: false
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}