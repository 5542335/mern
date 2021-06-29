import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePassDto } from './dto/change-pass.dto';
import { User, UserDocument } from './schemas/user.schema';
const bcrypt = require('bcrypt');

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

  async editUser(id: string, profileDto: Partial<CreateUserDto>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, profileDto, { new: true, useFindAndModify: false }).exec();
  }

   async validatePassword (id: string, changePassDto: ChangePassDto) {
    const user = await this.getUserById(id);
    const passwordEquals = await bcrypt.compare(
      changePassDto.oldPassword,
      user.password,
    );

    if (!passwordEquals) {
      throw new HttpException(
        'Неверный пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  async editPass (id: string, changePassDto: ChangePassDto): Promise<User> {
    this.validatePassword(id, changePassDto);

    const newHashPassword = await bcrypt.hash(changePassDto.newPassword, 5);

    return this.editUser(id, {password: newHashPassword})
  }
}
