import axios from 'axios'

export const getStripeClient = (secretKey: string) =>
  axios.create({
    baseURL: 'https://api.stripe.com/v1',
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  })
