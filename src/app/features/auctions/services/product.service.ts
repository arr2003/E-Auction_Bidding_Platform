import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Bid {
  id: string;
  productId: string;
  bidder: string;
  amount: number;
  timestamp: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  currentBid: number;
  endTime: Date;
  imageUrl: string;
  startingPrice: number;
  seller: string;
  category: string;
  condition: string;
  location: string;
  totalBids: number;
  bids: Bid[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // This will be replaced with API calls to a real backend in production
  private products: Product[] = [
    {
      id: '1',
      name: 'Apple iPhone 14 Pro',
      description: 'Latest Apple flagship smartphone with A16 Bionic chip, ProMotion display, and advanced camera system.',
      currentBid: 1100,
      endTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      imageUrl: '/assets/images/products/antique-vase.jpg', // Using existing image from assets
      startingPrice: 999,
      seller: 'John Doe',
      category: 'Electronics',
      condition: 'New',
      location: 'New York, USA',
      totalBids: 5,
      bids: [
        { id: '1', productId: '1', bidder: 'Alice', amount: 1000, timestamp: new Date(new Date().getTime() - 3 * 60 * 60 * 1000) },
        { id: '2', productId: '1', bidder: 'Bob', amount: 1050, timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000) },
        { id: '3', productId: '1', bidder: 'Charlie', amount: 1075, timestamp: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) },
        { id: '4', productId: '1', bidder: 'Diana', amount: 1090, timestamp: new Date(new Date().getTime() - 30 * 60 * 1000) },
        { id: '5', productId: '1', bidder: 'Eve', amount: 1100, timestamp: new Date(new Date().getTime() - 10 * 60 * 1000) }
      ]
    },
    {
      id: '2',
      name: 'Samsung 65" QLED TV',
      description: 'Stunning 4K QLED TV with HDR, Smart TV features, and ultra-slim design.',
      currentBid: 850,
      endTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: '/assets/images/products/Art Deco Lamp Antiques.jpg', // Using existing image from assets
      startingPrice: 700,
      seller: 'TechStore',
      category: 'Electronics',
      condition: 'Like New',
      location: 'San Francisco, USA',
      totalBids: 3,
      bids: [
        { id: '1', productId: '2', bidder: 'Frank', amount: 700, timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000) },
        { id: '2', productId: '2', bidder: 'Grace', amount: 800, timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000) },
        { id: '3', productId: '2', bidder: 'Heidi', amount: 850, timestamp: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '3',
      name: 'Vintage Rolex Watch',
      description: 'Classic Rolex Submariner, 1970s model, in excellent condition with original box.',
      currentBid: 5200,
      endTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      imageUrl: '/assets/images/products/placeholder.svg', // Using placeholder for Rolex watch
      startingPrice: 5000,
      seller: 'LuxuryTime',
      category: 'Watches',
      condition: 'Used',
      location: 'London, UK',
      totalBids: 2,
      bids: [
        { id: '1', productId: '3', bidder: 'Ivan', amount: 5000, timestamp: new Date(new Date().getTime() - 8 * 60 * 60 * 1000) },
        { id: '2', productId: '3', bidder: 'Judy', amount: 5200, timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '4',
      name: '2020 Trek Mountain Bike',
      description: 'High-performance mountain bike, barely used, perfect for trails and off-road adventures.',
      currentBid: 950,
      endTime: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
      imageUrl: '/assets/images/auctions/placeholder.svg', // Using auction placeholder for bike
      startingPrice: 800,
      seller: 'BikeWorld',
      category: 'Sports',
      condition: 'Like New',
      location: 'Berlin, Germany',
      totalBids: 4,
      bids: [
        { id: '1', productId: '4', bidder: 'Karl', amount: 800, timestamp: new Date(new Date().getTime() - 10 * 60 * 60 * 1000) },
        { id: '2', productId: '4', bidder: 'Liam', amount: 850, timestamp: new Date(new Date().getTime() - 8 * 60 * 60 * 1000) },
        { id: '3', productId: '4', bidder: 'Mona', amount: 900, timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 1000) },
        { id: '4', productId: '4', bidder: 'Nina', amount: 950, timestamp: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '5',
      name: 'MacBook Pro 16" (2021)',
      description: 'Apple MacBook Pro with M1 Pro chip, 16GB RAM, 1TB SSD. Excellent for professionals.',
      currentBid: 2100,
      endTime: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
      imageUrl: '/assets/images/products/placeholder.svg', // Using placeholder for MacBook
      startingPrice: 1800,
      seller: 'Jane Smith',
      category: 'Computers',
      condition: 'New',
      location: 'Toronto, Canada',
      totalBids: 6,
      bids: [
        { id: '1', productId: '5', bidder: 'Oscar', amount: 1800, timestamp: new Date(new Date().getTime() - 12 * 60 * 60 * 1000) },
        { id: '2', productId: '5', bidder: 'Paul', amount: 1900, timestamp: new Date(new Date().getTime() - 10 * 60 * 60 * 1000) },
        { id: '3', productId: '5', bidder: 'Quinn', amount: 1950, timestamp: new Date(new Date().getTime() - 8 * 60 * 60 * 1000) },
        { id: '4', productId: '5', bidder: 'Rita', amount: 2000, timestamp: new Date(new Date().getTime() - 6 * 60 * 60 * 1000) },
        { id: '5', productId: '5', bidder: 'Sam', amount: 2050, timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 1000) },
        { id: '6', productId: '5', bidder: 'Tina', amount: 2100, timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000) }
      ]
    }
  ];
  
  // TODO: Replace with actual API integration
  private fetchProductsFromAPI(): void {
    // This method would fetch products from a real backend API
    // For now, we're using an empty array
  }

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  placeBid(productId: string, amount: number, bidder: string = 'Anonymous'): Observable<boolean> {
    const product = this.products.find(p => p.id === productId);
    if (product && amount > product.currentBid && new Date() < new Date(product.endTime)) {
      const newBid: Bid = {
        id: (product.bids.length + 1).toString(),
        productId,
        bidder,
        amount,
        timestamp: new Date()
      };
      product.bids.unshift(newBid);
      product.currentBid = amount;
      product.totalBids++;
      return of(true);
    }
    return of(false);
  }

  getBidHistory(productId: string): Observable<Bid[]> {
    const product = this.products.find(p => p.id === productId);
    return of(product ? product.bids : []);
  }
}