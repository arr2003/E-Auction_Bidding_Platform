import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/">
        <mat-icon>gavel</mat-icon>
        <span>E-Auction</span>
      </button>

      <span class="spacer"></span>

      <nav>
        <button mat-button routerLink="/products">
          <mat-icon>store</mat-icon>
          Products
        </button>
        <button mat-button routerLink="/auctions">
          <mat-icon>timer</mat-icon>
          Auctions
        </button>
        <button mat-button routerLink="/orders">
          <mat-icon>shopping_cart</mat-icon>
          Orders
        </button>
        <button mat-button routerLink="/profile">
          <mat-icon>person</mat-icon>
          Profile
        </button>
        <button mat-raised-button color="accent" routerLink="/auth/login">
          <mat-icon>login</mat-icon>
          Login
        </button>
      </nav>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    mat-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    nav button {
      margin-left: 8px;
    }

    mat-icon {
      margin-right: 4px;
    }
  `]
})
export class NavComponent {}