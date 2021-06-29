import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ChangePassDto } from './dto/change-pass.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findUser(@Query('token') token: string) {
    return this.userService.getUser(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() profileDto: Partial<CreateUserDto>) {
    return this.userService.editUser(id, profileDto);
  }

  @Patch(':id/change-password')
  updatePass(@Param('id') id: string, @Body() changePassDto: ChangePassDto) {
    return this.userService.editPass(id, changePassDto);
  }
}