import { Property } from "../properties/Property";
import { Owner } from "../users/Owner";
import { User } from "../users/User";

export enum TransactionStatus{
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED"
}

export class Transaction{
  private status: TransactionStatus = TransactionStatus.PENDING;

  constructor(
    protected id : number,
    protected property: Property,
    protected buyer: User,
    protected seller: Owner,
    protected buyDate : Date,
    protected amount : number
  ){}

  completed(): void{
    if(this.status !== TransactionStatus.PENDING){
      throw new Error("La transacción no puede completarse")
    }
    this.status = TransactionStatus.COMPLETED
  }

  canceled(): TransactionStatus{
    return this.status = TransactionStatus.CANCELED
  }
}