import { Body, Controller, Param, Put } from '@nestjs/common';
import { ProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('api/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() profileDto: ProfileDto) {
    return this.profileService.updateUser();
  }
}
