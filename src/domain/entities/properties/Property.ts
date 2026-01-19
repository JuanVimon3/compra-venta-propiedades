export enum PropertyStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  REMOVED = "REMOVED"
}

export abstract class Property {

  protected status: PropertyStatus = PropertyStatus.DRAFT;

  constructor(
    protected id: number,
    protected price: number,
    protected address: string
  ) {}

  abstract getType(): string

  getPrice(): number {
    return this.price
  };

  getStatus(): PropertyStatus{
    return this.status
  }

  updatePice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error("Precio inválido");
    }
    this.price = newPrice;
  };

  updateAddress(newAddress: string): void {
    if (!newAddress.trim()) {
      throw new Error("Dirección inválida");
    }
    this.address = newAddress;
  };

  protected updateStatus(status: PropertyStatus): void {
    this.status = status;
  }

};

