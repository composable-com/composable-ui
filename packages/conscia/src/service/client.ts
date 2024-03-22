import axios from 'axios'

export const consciaClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONSCIA_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONSCIA_TOKEN}`,
    'X-Customer-Code': process.env.NEXT_PUBLIC_CONSCIA_CUSTOMER_CODE ?? '',
  },
})
