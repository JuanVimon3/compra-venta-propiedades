import { Property } from "../properties/Property";
import { PropertyStatus } from "../properties/Property";
import {User} from "./User"

export class Admin extends User{


  getRole(): string {
    return "Admin"
  };

  removeProperty(property: Property): void {
    if(property.getStatus() === PropertyStatus.REMOVED){
      throw new Error('La propiedad ya fue removida')
    }

    property["updateStatus"](PropertyStatus.REMOVED)
  }

  approveProperty(property: Property): void {
    if(property.getStatus() !== PropertyStatus.DRAFT){
      throw new Error('La propiedad no puede ser aprobada')
    }

    property["updateStatus"](PropertyStatus.PUBLISHED)
  }
}