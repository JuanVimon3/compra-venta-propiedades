import { Property } from "./Property"

export class Apartment extends Property{
  constructor(
    id: number,
    price: number,
    address: string,
    private rooms: number,
    private floor: number,
    private hasElevator: boolean,
    private hasParking: boolean
  ){
    super(id, price, address)
  }

  getType(): string {
    return "Apartment"
  };

  getRooms(): number {
    return this.rooms
  };

  getFloor(): number {
    return this.floor
  };

  getHasElevator(): boolean{
    return this.hasElevator
  };

  getHasParking(): boolean{
    return this.hasParking
  };
}