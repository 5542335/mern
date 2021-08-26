import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { LikedRepoDto } from './dto/likedRepo.dto';
import { LikedRepoService } from './likedRepo.service';

@Controller('api/likedRepo')
export class LikedRepoController {
    constructor(private likedRepoService: LikedRepoService) {}

  @Post('/like')
  addLikeRepo(@Body() likedRepoDto: LikedRepoDto) {
    return this.likedRepoService.addLikeRepo(likedRepoDto);
  }

//   @Patch('/dislike')
//   deleteRepo(@Body() createUserDto: CreateUserDto) {
//     return this.authService.registration(createUserDto);
//   }

//   @Get()
//   findUser(@Query('/findRepo') token: string) {
//     return this.userService.getUser(token);
//   }
  
  }
