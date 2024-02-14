import { Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.model';

@Controller({ path: "user", version: "1" })
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }
}
