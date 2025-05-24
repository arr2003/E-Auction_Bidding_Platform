import { Injectable } from '@angular/core';
import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { environment } from '../../../environments/environment';
import { Product, Bid, User, Order } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sequelize: Sequelize;
  private models: { [key: string]: ModelCtor<Model> } = {};
  private isInitialized = false;

  constructor() {
    // Initialize Sequelize with database configuration from environment
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      database: environment.database.database,
      logging: false, // Set to console.log to see SQL queries
      define: {
        timestamps: true,
        underscored: true
      }
    });
  }

  /**
   * Initialize database connection and define models
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Test the connection
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');

      // Define models
      this.defineModels();

      // Sync models with database (in production, use migrations instead)
      await this.sequelize.sync({ alter: true });

      this.isInitialized = true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  /**
   * Define Sequelize models based on our interfaces
   */
  private defineModels(): void {
    // User model
    // User model
      this.models['User'] = this.sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('buyer', 'seller', 'admin'),
        allowNull: false,
        defaultValue: 'buyer'
      }
    });

    // Product model
    // Product model
      this.models['Product'] = this.sequelize.define('Product', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      basePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      currentPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      status: {
        type: DataTypes.ENUM('active', 'sold', 'expired'),
        allowNull: false,
        defaultValue: 'active'
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Bid model
    // Bid model
      this.models['Bid'] = this.sequelize.define('Bid', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      bidderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('active', 'won', 'lost'),
        allowNull: false,
        defaultValue: 'active'
      }
    });

    // Order model
    // Order model
      this.models['Order'] = this.sequelize.define('Order', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      buyerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      finalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      }
    });

    // Define relationships
    // Define relationships
      this.models['User'].hasMany(this.models['Product'], { foreignKey: 'sellerId', as: 'products' });
    this.models['Product'].belongsTo(this.models['User'], { foreignKey: 'sellerId', as: 'seller' });

    this.models['User'].hasMany(this.models['Bid'], { foreignKey: 'bidderId', as: 'bids' });
    this.models['Bid'].belongsTo(this.models['User'], { foreignKey: 'bidderId', as: 'bidder' });

    this.models['Product'].hasMany(this.models['Bid'], { foreignKey: 'productId', as: 'bids' });
    this.models['Bid'].belongsTo(this.models['Product'], { foreignKey: 'productId', as: 'product' });

    this.models['Product'].hasOne(this.models['Order'], { foreignKey: 'productId', as: 'order' });
    this.models['Order'].belongsTo(this.models['Product'], { foreignKey: 'productId', as: 'product' });
  }

  /**
   * Get a model by name
   */
  getModel(modelName: string): ModelCtor<Model> {
    if (!this.isInitialized) {
      throw new Error('Database service is not initialized. Call initialize() first.');
    }
    return this.models[modelName];
  }

  /**
   * Close the database connection
   */
  async close(): Promise<void> {
    if (this.sequelize) {
      await this.sequelize.close();
      this.isInitialized = false;
    }
  }
}