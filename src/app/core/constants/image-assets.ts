export const PRODUCT_IMAGE_PATHS = {
    PLACEHOLDER: '/assets/images/products/placeholder.svg',
    BASE_PATH: '/assets/images/products',
};

export const AUCTION_IMAGE_PATHS = {
    PLACEHOLDER: '/assets/images/auctions/placeholder.svg',
    BASE_PATH: '/assets/images/auctions',
};

export const getProductImagePath = (imageName: string): string => {
    if (!imageName) return PRODUCT_IMAGE_PATHS.PLACEHOLDER;
    return `${PRODUCT_IMAGE_PATHS.BASE_PATH}/${imageName}`;
};

export const getProductImagesPath = (images: string[]): string[] => {
    if (!images || images.length === 0) return [PRODUCT_IMAGE_PATHS.PLACEHOLDER];
    return images.map(image => getProductImagePath(image));
};

export const getAuctionImagePath = (imageName: string): string => {
    if (!imageName) return AUCTION_IMAGE_PATHS.PLACEHOLDER;
    return `${AUCTION_IMAGE_PATHS.BASE_PATH}/${imageName}`;
};

export const getAuctionImagesPath = (images: string[]): string[] => {
    if (!images || images.length === 0) return [AUCTION_IMAGE_PATHS.PLACEHOLDER];
    return images.map(image => getAuctionImagePath(image));
};