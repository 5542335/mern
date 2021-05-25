import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly userModel: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.userModel;
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.push(createUserDto);
    return createdUser;
  }
}
