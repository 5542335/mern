import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findUser(@Query('token') token: string) {
    return this.userService.getUser(token);
  }

  // @Put()
  // editUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.editUser(createUserDto);
  // }
}
