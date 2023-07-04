import { Payment } from './payment';

export class UserPaymentsInfo {
  constructor(
    public id: string,
    public numPayments: number,
    public total: number,
    public numInvoices: number,
    public due7Days: number,
    public dueToday: number,
    public greatestValueProvider: string,
    public greatestValue: number,
    public mostFrequentCategory: string,
    public mostFrequentCategoryFrequency: number,
    public payments: Payment[]
  ) {}
}
