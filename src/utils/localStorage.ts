import type { Product } from './types'

const STORAGE_KEY = 'product_registry'

export function getProducts(): Product[] {
  const productsString = localStorage.getItem(STORAGE_KEY)
  return productsString ? JSON.parse(productsString) : []
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export function getProductById(id: string) {
  return getProducts().find((product: Product) => product.id === id)
}

export function removeProduct(id: string) {
  const updatedProducts = getProducts().filter((product: Product) => product.id !== id)
  saveProducts(updatedProducts)
}
