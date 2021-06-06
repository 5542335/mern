import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  // async getUserByEmail(email: string) {
  //   const user = await this.userModel.findOne({
  //     where: { email },
  //     include: { all: true },
  //   });
  //   return user;
  // }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }
}
