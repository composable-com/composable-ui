import products from './products.json'

const findProductById = (id: string) => {
  return products.find((product) => product.id === id) ?? products[0]
}

export const generateCartData = ({
  productId,
  quantity,
}: { productId?: string; quantity?: number } = {}) => {
  const _product = productId ? findProductById(productId) : products[0]
  const subtotal = _product.price * (quantity ?? 1)
  const taxes = subtotal * 0.07
  const total = subtotal + taxes

  return {
    items: [
      {
        brand: _product.brand,
        category: _product.category,
        id: _product.id,
        image: _product.images[0],
        name: _product.name,
        price: _product.price,
        quantity: quantity ?? 1,
        sku: _product.sku,
        slug: _product.slug,
        type: _product.type,
      },
    ],
    summary: {
      subtotalPrice: subtotal.toFixed(2),
      taxes: taxes.toFixed(2),
      totalPrice: total.toFixed(2),
      shipping: 'Free',
    },
  }
}
