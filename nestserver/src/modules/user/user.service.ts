import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePassDto } from './dto/change-pass.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LikedRepoDto } from './dto/likedRepo.dto';
import { BlockUserDto } from './dto/block-user.dto';
import { ChangeAvatarDto } from './dto/change-avatar.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async getUser(token: string) {
    const { id } = this.jwtService.decode(token) as { id: string };

    return this.userModel.findById(id).exec();
  }

  async getLikedRepoIds(token: string) {
    const { likedRepo } = await this.getUser(token);
    return likedRepo;
  }

  async editUser(
    id: string,
    profileDto: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, profileDto, { new: true, useFindAndModify: false })
      .exec();
  }

  async validatePassword(id: string, changePassDto: ChangePassDto) {
    const user = await this.getUserById(id);
    const passwordEquals = await bcrypt.compare(
      changePassDto.oldPassword,
      user.password,
    );

    if (!passwordEquals) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async editPass(id: string, changePassDto: ChangePassDto): Promise<User> {
    await this.validatePassword(id, changePassDto);

    const newHashPassword = await bcrypt.hash(changePassDto.newPassword, 5);

    return this.userModel
      .findByIdAndUpdate(
        id,
        { password: newHashPassword },
        { new: true, useFindAndModify: false },
      )
      .exec();
  }

  async addLikeRepo(likedRepoDto: LikedRepoDto) {
    const { id } = await this.getUser(likedRepoDto.token);
    await this.userModel
      .updateOne(
        { _id: id },
        { $addToSet: { likedRepo: likedRepoDto.repositoryId } },
        { new: true },
      )
      .exec();

    return { asd: likedRepoDto.repositoryId };
  }

  async deleteLikeRepo(likedRepoDto: LikedRepoDto) {
    const { id } = await this.getUser(likedRepoDto.token);
    await this.userModel
      .updateOne(
        { _id: id },
        { $pull: { likedRepo: likedRepoDto.repositoryId } },
        { new: true },
      )
      .exec();
    return { asd: likedRepoDto.repositoryId };
  }

  async checkLikeRepo(likedRepoDto: LikedRepoDto) {
    const { likedRepo } = await this.getUser(likedRepoDto.token);
    const liked = likedRepo.includes(likedRepoDto.repositoryId);

    return { liked };
  }

  async blockUser(blockUserDto: BlockUserDto) {
    return await this.userModel.findByIdAndUpdate(blockUserDto.userId, { active: blockUserDto.active }, { new: true }).exec();
  }

  async changeAvatar(changeAvatarDto: ChangeAvatarDto, token: string) {
    const { id } = await this.getUser(token);
    return this.userModel
      .findByIdAndUpdate({ _id: id }, { avatar: changeAvatarDto.avatar }, { new: true, useFindAndModify: false })
      .exec();
  }
}
