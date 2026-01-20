import { Transaction } from "./Transaction";

export enum ContractStatus  {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED"  
}

export class Contract{
  private status: ContractStatus = ContractStatus.DRAFT

  constructor(
    private id : number,
    private transaction : Transaction,
    private startDate: Date,
    private endDate: Date
  ){}

  activate(): void {
    if(this.status !== ContractStatus.DRAFT){
      throw new Error("El contrato no puede activarse");
    };
    this.status = ContractStatus.ACTIVE
  }

  expire(): ContractStatus{
    return this.status = ContractStatus.EXPIRED
  }
}