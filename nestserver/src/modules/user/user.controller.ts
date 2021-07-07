import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangePassDto } from './dto/change-pass.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
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
