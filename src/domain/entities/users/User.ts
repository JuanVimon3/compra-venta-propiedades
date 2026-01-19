export abstract class User{
  constructor(
    protected id: number,
    protected name: string,
    protected email: string,
  ){};

  abstract getRole(): string;

  getName(): string{
    return this.name
  };

  getEmail(): string{
    return this.email
  }
}