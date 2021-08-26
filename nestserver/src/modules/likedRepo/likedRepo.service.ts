import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikedRepoDto } from './dto/likedRepo.dto';
import { likedRepo, likedRepoDocument } from './schemas/likedRepo.schema';

@Injectable()
export class LikedRepoService {
  constructor(
    @InjectModel(likedRepo.name) private likedRepoModel: Model<likedRepoDocument>,
  ) {}

  async addLikeRepo(likedRepoDto: LikedRepoDto) {
    const addRepo = new this.likedRepoModel(likedRepoDto);

    return addRepo.save();
  }

//   async getUserByEmail(email: string) {
//     return this.userModel.findOne({ email: email }).exec();
//   }

//   async editUser(id: string, profileDto: Partial<CreateUserDto>): Promise<User> {
//     return this.userModel.findByIdAndUpdate(id, profileDto, { new: true, useFindAndModify: false }).exec();
//   }

//   async editPass (id: string, changePassDto: ChangePassDto): Promise<User> {
//     await this.validatePassword(id, changePassDto);

//     const newHashPassword = await bcrypt.hash(changePassDto.newPassword, 5);

//     return this.userModel.findByIdAndUpdate(id, {password: newHashPassword}, { new: true, useFindAndModify: false }).exec();
//   }
}
