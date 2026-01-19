import { Property } from "./Property";

export class Farm extends Property{
  constructor(
    id: number,
    price: number,
    address: string,
    private rooms: number,
    private landArea: number,
    private suitableForCultivation: boolean,
    private suitableForAnimals: boolean,
  ) {
    super(id, price, address)
  }

  getType(): string {
    return "Farm"
  }

  getRooms(): number{
    return this.rooms
  };

  getLandArea(): number{
    return this.landArea
  }

  getSuitableCultivation(): boolean{
    return this.suitableForCultivation
  };

  getSuitableAnimals(): boolean{
    return this.suitableForAnimals
  }
}