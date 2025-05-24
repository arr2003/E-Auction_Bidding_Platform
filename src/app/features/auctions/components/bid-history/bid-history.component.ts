import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProductService, Bid } from '../../services/product.service';

@Component({
  selector: 'app-bid-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ],
  template: `
    <mat-card class="bid-history-card">
      <mat-card-header>
        <mat-card-title>Bid History</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="bidHistory" class="bid-history-table">
          <ng-container matColumnDef="bidder">
            <th mat-header-cell *matHeaderCellDef>Bidder</th>
            <td mat-cell *matCellDef="let bid">{{bid.bidder}}</td>
          </ng-container>

          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let bid">{{bid.amount | currency:'USD'}}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Time</th>
            <td mat-cell *matCellDef="let bid">{{bid.timestamp | date:'medium'}}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .bid-history-card {
      margin-top: 2rem;
    }

    .bid-history-table {
      width: 100%;
    }

    th.mat-header-cell {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.87);
    }

    .mat-row:nth-child(even) {
      background-color: #f5f5f5;
    }

    .mat-row:hover {
      background-color: #eeeeee;
    }
  `]
})
export class BidHistoryComponent implements OnInit {
  @Input() productId?: string;

  displayedColumns: string[] = ['bidder', 'amount', 'timestamp'];
  bidHistory: Bid[] = [];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    if (this.productId) {
      this.loadBidHistory();
    }
  }
  
  loadBidHistory(): void {
    if (this.productId) {
      this.productService.getBidHistory(this.productId).subscribe(bids => {
        this.bidHistory = bids;
      });
    }
  }
}