import { Module } from '@nestjs/common';
import { UserController } from '~/modules/users/users.controller';
import { UserService } from '~/modules/users/users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
