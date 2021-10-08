import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { ChangePassDto } from './dto/change-pass.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LikedRepoDto } from './dto/likedRepo.dto';

import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/admin')
  @UseGuards(RolesGuard)
  // @Roles('admin')
  findUserForTestAdmin(@Query('token') token: string) {
    return this.userService.getUser(token);
  }

  @Get()
  findUser(@Query('token') token: string) {
    return this.userService.getUser(token);
  }

  @Get('/getLikedRepoIds')
  getLikedRepoIds(@Query('token') token: string) {
    return this.userService.getLikedRepoIds(token);
  }

  @Patch('/editUser/:id')
  update(@Param('id') id: string, @Body() profileDto: Partial<CreateUserDto>) {
    return this.userService.editUser(id, profileDto);
  }

  @Patch(':id/change-password')
  updatePass(@Param('id') id: string, @Body() changePassDto: ChangePassDto) {
    return this.userService.editPass(id, changePassDto);
  }

  @Patch('/like')
  addLikeRepo(@Body() likedRepoDto: LikedRepoDto) {
    return this.userService.addLikeRepo(likedRepoDto);
  }

  @Patch('/dislike')
  deleteRepo(@Body() likedRepoDto: LikedRepoDto) {
    return this.userService.deleteLikeRepo(likedRepoDto);
  }

  @Post('/getLike')
  checkLikeRepo(@Body() likedRepoDto: LikedRepoDto) {
    return this.userService.checkLikeRepo(likedRepoDto);
  }
}
