export interface ProductDescription {
  name: string;
  description: string;
  dateAdd?: string;
  dateUpdate?: string;
}

export interface ProductAvailability {
  quality: number;
  dateAdd?: string;
  dateUpdate?: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  order: number;
  thumbnail: boolean;
}

export interface Product {
  id: string;
  sku: string;
  visible: boolean;
  dateAdd: string;
  dateUpdate: string;
  price?: number;
  descriptionInfo: ProductDescription;
  availability: ProductAvailability;
  images?: ProductImage[];
}
