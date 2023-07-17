export interface StripeSetupIntent {
  id: string
  client_secret: string
  payment_method: string | null
  customer: string | null
}

export interface StripeSetupIntentParams {
  usage: 'on_session' | 'off_session'
  customer?: string
  paymentMethodTypes?: string[]
  metadata?: {
    loggedIn: boolean
    userId?: string
    userEmail?: string
    sub?: string
  }
}

export interface StripeCustomerParams {
  email?: string
}

export interface StripeCustomer {
  id: string
  email: string | null
}

export interface StripeCustomerSearchResponse {
  data: StripeCustomer[]
}

export interface StripePaymentIntentParams {
  amount: number
  currency: string
  confirm?: boolean
  off_session?: boolean
  capture_method?: 'manual' | 'automatic'
  automatic_payment_methods?: {
    enabled: boolean
  }
  payment_method?: string
  customer?: string
  return_url?: string
  metadata?: {
    loggedIn: boolean
    userId?: string
    userEmail?: string
    sub?: string
  }
}

export interface StripePaymentIntent {
  id: string
  client_secret: string
  status: StripePaymentIntentStatus
  charges?: {
    data: StripeCharge[]
  }
  next_action?: {
    redirect_to_url: {
      return_url: string
      url: string
    }
    type: string
  }
  metadata?: {
    loggedIn: boolean
    userId?: string
    userEmail?: string
    sub?: string
  }
}

export type StripePaymentIntentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'requires_capture'
  | 'canceled'
  | 'succeeded'

export interface StripeCharge {
  id: string
  payment_method_details: {
    type: string
    card?: StripeCard
  }
}

export interface StripeCard {
  brand: string
  country: string
  exp_month: number
  exp_year: number
  last4: string
  network: string
}

export interface StripePaymentMethodParams {
  id: string
}

export interface StripePaymentMethod {
  id: string
  card?: StripeCard
}
