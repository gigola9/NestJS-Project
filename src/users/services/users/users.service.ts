import { Get, Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { SerializedUser, User } from '../../types';
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity} from '../../../typeorm';
import { Repository } from "typeorm";
import { encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {

  private users: User[] = [];

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {

  }

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUserName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username} });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
