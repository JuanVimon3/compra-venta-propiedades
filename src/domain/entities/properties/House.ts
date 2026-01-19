import { Property } from "./Property"

export class House extends Property{
  constructor(
    id: number,
    price: number,
    address: string,
    private rooms: number
  ){
    super(id, price, address)
  }

  getType(): string {
    return "House"
  };

  getRooms(): number{
    return this.rooms
  }
}