export class Payment {
  constructor(
    public invoiceId: number,
    public numItems: number,
    public providerName: string,
    public providerId: string,
    public category: string,
    public dueDate: Date,
    public invoiceValue: number,
    public assignedEmployeeName: string,
    public assignedEmnployeeRole: string,
    public status: string
  ) {}
}
