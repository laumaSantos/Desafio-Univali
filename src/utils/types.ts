export type Product = {
  id: string
  name: string
  unit: 'Litro' | 'Quilograma' | 'Unidade'
  quantity?: number
  price: string
  perishable: boolean
  expirationDate?: string
  manufacturingDate: string
}
