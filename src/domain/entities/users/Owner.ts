import { User } from "./User"
import { Property } from "../properties/Property";

export class Owner extends User{
  private properties: Property[] = [];

  getRole(): string{
    return "Owner"
  };

  addProperty(property: Property): void{
    this.properties.push(property)
  };

  getProperties(): Property[]{
    return this.properties
  }
  
}