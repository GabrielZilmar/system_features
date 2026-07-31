export class AddressDto {
  id: number;

  name: string;

  constructor(init: AddressDto) {
    Object.assign(this, init);
  }
}
