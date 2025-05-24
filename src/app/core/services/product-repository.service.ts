import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable, from, map, catchError, throwError } from 'rxjs';
import { Product, Bid } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService {
  constructor(private dbService: DatabaseService) {}

  /**
   * Get all products
   */
  getAllProducts(): Observable<Product[]> {
    return from(this.dbService.getModel('Product').findAll({
      include: [{
        model: this.dbService.getModel('User'),
        as: 'seller',
        attributes: ['id', 'username']
      }, {
        model: this.dbService.getModel('Bid'),
        as: 'bids',
        limit: 1,
        order: [['amount', 'DESC']]
      }],
      order: [['createdAt', 'DESC']]
    })).pipe(
      map(products => products.map(product => this.mapProductFromDb(product))),
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }

  /**
   * Get product by ID
   */
  getProductById(id: string): Observable<Product | null> {
    return from(this.dbService.getModel('Product').findByPk(id, {
      include: [{
        model: this.dbService.getModel('User'),
        as: 'seller',
        attributes: ['id', 'username']
      }, {
        model: this.dbService.getModel('Bid'),
        as: 'bids',
        include: [{
          model: this.dbService.getModel('User'),
          as: 'bidder',
          attributes: ['id', 'username']
        }],
        order: [['amount', 'DESC']]
      }]
    })).pipe(
      map(product => product ? this.mapProductFromDb(product) : null),
      catchError(error => {
        console.error(`Error fetching product with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch product with ID ${id}`));
      })
    );
  }

  /**
   * Create a new product
   */
  createProduct(product: Partial<Product>): Observable<Product> {
    return from(this.dbService.getModel('Product').create(product)).pipe(
      map(newProduct => this.mapProductFromDb(newProduct)),
      catchError(error => {
        console.error('Error creating product:', error);
        return throwError(() => new Error('Failed to create product'));
      })
    );
  }

  /**
   * Update a product
   */
  updateProduct(id: string, product: Partial<Product>): Observable<Product | null> {
    return from(this.dbService.getModel('Product').update(product, {
      where: { id },
      returning: true
    })).pipe(
      map(([affectedCount, updatedProducts]) => {
        if (affectedCount > 0 && updatedProducts.length > 0) {
          return this.mapProductFromDb(updatedProducts[0]);
        }
        return null;
      }),
      catchError(error => {
        console.error(`Error updating product with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to update product with ID ${id}`));
      })
    );
  }

  /**
   * Delete a product
   */
  deleteProduct(id: string): Observable<boolean> {
    return from(this.dbService.getModel('Product').destroy({
      where: { id }
    })).pipe(
      map(affectedCount => affectedCount > 0),
      catchError(error => {
        console.error(`Error deleting product with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to delete product with ID ${id}`));
      })
    );
  }

  /**
   * Get bids for a product
   */
  getBidsByProductId(productId: string): Observable<Bid[]> {
    return from(this.dbService.getModel('Bid').findAll({
      where: { productId },
      include: [{
        model: this.dbService.getModel('User'),
        as: 'bidder',
        attributes: ['id', 'username']
      }],
      order: [['amount', 'DESC']]
    })).pipe(
      map(bids => bids.map(bid => this.mapBidFromDb(bid))),
      catchError(error => {
        console.error(`Error fetching bids for product ID ${productId}:`, error);
        return throwError(() => new Error(`Failed to fetch bids for product ID ${productId}`));
      })
    );
  }

  /**
   * Place a bid on a product
   */
  placeBid(bid: Partial<Bid>): Observable<Bid> {
    return from(this.dbService.getModel('Bid').create(bid)).pipe(
      map(newBid => this.mapBidFromDb(newBid)),
      catchError(error => {
        console.error('Error placing bid:', error);
        return throwError(() => new Error('Failed to place bid'));
      })
    );
  }

  /**
   * Map database product model to our Product interface
   */
  private mapProductFromDb(dbProduct: any): Product {
    const product = dbProduct.toJSON();
    
    // Map the highest bid to currentPrice if available
    if (product.bids && product.bids.length > 0) {
      product.currentPrice = product.bids[0].amount;
    } else {
      product.currentPrice = product.basePrice;
    }

    // Map seller username
    if (product.seller) {
      product.sellerName = product.seller.username;
    }

    // Map images array to a single imageUrl for compatibility
    if (product.images && product.images.length > 0) {
      product.imageUrl = product.images[0];
    } else {
      product.imageUrl = '/assets/images/placeholder.png';
    }

    return product as Product;
  }

  /**
   * Map database bid model to our Bid interface
   */
  private mapBidFromDb(dbBid: any): Bid {
    const bid = dbBid.toJSON();
    
    // Map bidder username
    if (bid.bidder) {
      bid.bidderName = bid.bidder.username;
    }

    return bid as Bid;
  }
}