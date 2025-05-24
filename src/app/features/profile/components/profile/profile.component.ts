import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-header">
        <div class="profile-avatar">
          <mat-icon class="avatar-icon">account_circle</mat-icon>
        </div>
        <div class="profile-info">
          <h2> Raj Dongare</h2>
          <p>rajdongare&#64;gmail.com</p>
          <button mat-raised-button color="primary">Edit Profile</button>
        </div>
      </mat-card>

      <mat-tab-group>
        <mat-tab label="Personal Information">
          <div class="tab-content">
            <h3>Personal Details</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Full Name:</span>
                <span>Raj Dongare</span>
              </div>
              <div class="info-item">
                <span class="label">Email:</span>
                <span>rajdongare&#64;gmail.com</span>
              </div>
              <div class="info-item">
                <span class="label">Phone:</span>
                <span>+1234567890</span>
              </div>
              <div class="info-item">
                <span class="label">Location:</span>
                <span>Nagpur, India</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Auction History">
          <div class="tab-content">
            <h3>Your Bids</h3>
            <p>No auction history available.</p>
          </div>
        </mat-tab>

        <mat-tab label="Won Auctions">
          <div class="tab-content">
            <h3>Won Items</h3>
            <p>No won auctions yet.</p>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .profile-header {
      display: flex;
      align-items: center;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .profile-avatar {
      margin-right: 2rem;
    }

    .avatar-icon {
      font-size: 80px;
      height: 80px;
      width: 80px;
    }

    .profile-info {
      h2 {
        margin: 0;
        font-size: 24px;
      }

      p {
        color: #666;
        margin: 0.5rem 0 1rem;
      }
    }

    .tab-content {
      padding: 2rem;

      h3 {
        margin-top: 0;
        margin-bottom: 1.5rem;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      .label {
        font-weight: 500;
        margin-right: 0.5rem;
        color: #666;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}