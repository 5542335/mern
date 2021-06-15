import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async getUser(token: string) {
    const { id } = this.jwtService.decode(token) as { id: string };

    return this.userModel.findById(id).exec();
  }

  // async editUser(): Promise<User> {
  //   return this.userModel.findOneAndReplace().exec();
  // }
}
