export type PaymentIntentStatus =
  | 'created'
  | 'pending'
  | 'completed'
  | 'cancelled';
export type PaymentIntentCreator = 'payer' | 'payee';
