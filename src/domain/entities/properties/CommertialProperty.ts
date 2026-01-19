import { Property } from "./Property";

export class CommertialProperty extends Property{
  constructor(
    id: number,
    price: number,
    address: string,
    private bussinessType: string,
    private area: number,
    private hasParking: boolean
  ){
    super(id, price, address)
  };

  getType(): string {
    return "CommertialProperty"
  };

  getBussinessType(): string{
    return this.bussinessType
  };

  getArea():number {
    return this.area
  }

  getHasParking(): boolean{
    return this.hasParking
  };

}