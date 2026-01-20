export enum PaymentStatus{
  PENDING = "PENDING",
  FAILED = "FAILED",
  PAID = "PAID"
};

export class Payment{
  private status: PaymentStatus = PaymentStatus.PENDING;

  constructor(
    private id : number,
    private amount : number,
    private method : string
  ){}

  confirm(): PaymentStatus{
    return this.status = PaymentStatus.PAID
  };

  fail(): PaymentStatus{
    return this.status = PaymentStatus.FAILED
  }
}