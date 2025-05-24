# Image Assets for E-Auction Platform

## Directory Structure

- `/assets/images/products/` - Contains product images for listings
- `/assets/images/auctions/` - Contains auction-specific images

## Current Images

### Products
- `antique-vase.jpg` - Used for iPhone 14 Pro listing
- `Art Deco Lamp Antiques.jpg` - Used for Samsung QLED TV listing
- `placeholder.svg` - Used as fallback for products without specific images

### Auctions
- `placeholder.svg` - Used as fallback for auctions without specific images

## Image Guidelines

1. Product images should be 4:3 aspect ratio for consistent display
2. Recommended size: 800x600px
3. Acceptable formats: JPG, PNG, SVG
4. Maximum file size: 500KB
5. Use descriptive filenames with product type and category

## Adding New Images

When adding new product images:
1. Place them in the appropriate directory based on category
2. Update the product service to reference the correct path
3. Ensure image paths in the service match the actual file locations
4. Test image display in both product list and detail views

## Placeholder Usage

Placeholder images are automatically used when:
- A product image fails to load
- A product doesn't have a specific image assigned