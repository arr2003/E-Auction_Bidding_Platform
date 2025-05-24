export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    role: 'buyer' | 'seller' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    currentPrice: number;
    sellerId: string;
    category: string;
    images: string[];
    status: 'active' | 'sold' | 'expired';
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Bid {
    id: string;
    productId: string;
    bidderId: string;
    amount: number;
    status: 'active' | 'won' | 'lost';
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    id: string;
    productId: string;
    buyerId: string;
    sellerId: string;
    finalPrice: number;
    status: 'pending' | 'paid' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export interface DeliveryOrder {
    id: string;
    orderId: string;
    address: string;
    status: 'pending' | 'shipped' | 'delivered';
    trackingNumber?: string;
    estimatedDeliveryDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}