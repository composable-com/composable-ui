import { CommerceService } from '@composable/types'
import shippingMethods from '../../data/shipping-methods.json'

export const getShippingMethods: CommerceService['getShippingMethods'] =
  async () => {
    return shippingMethods
  }
