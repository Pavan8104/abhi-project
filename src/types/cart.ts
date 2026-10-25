import { Product, ProductVariant } from "./product";

export interface CartItem {
  id: string; // unique cart line id, e.g. `${product.id}-${variant.id}`
  productId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface CouponCode {
  code: string;
  discountPercentage: number;
  description: string;
  minOrderValue: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "cod" | "upi" | "card";
}
