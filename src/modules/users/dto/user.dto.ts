export class UserDto {
  id: number;

  constructor(init: UserDto) {
    Object.assign(this, init);
  }
}
