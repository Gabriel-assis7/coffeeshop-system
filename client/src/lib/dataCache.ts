type CACHE_TAG = 'products' | 'users' | 'categories' | 'orders' | 'carts';

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id:${id}-${tag}` as const;
}

export function getUserIdTag(tag: CACHE_TAG, userId: string) {
  return `user:${userId}-${tag}` as const;
}

export function getProductIdTag(tag: CACHE_TAG, productId: string) {
  return `product:${productId}-${tag}` as const;
}

export function getCategoryIdTag(tag: CACHE_TAG, categoryId: string) {
  return `category:${categoryId}-${tag}` as const;
}

export function getOrderIdTag(tag: CACHE_TAG, orderId: string) {
  return `order:${orderId}-${tag}` as const;
}

export function getCartIdTag(tag: CACHE_TAG, cartId: string) {
  return `cart:${cartId}-${tag}` as const;
}
