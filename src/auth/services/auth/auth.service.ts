import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePassword } from '../../../utils/bcrypt';

@Injectable()
export class AuthService {

  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.usersService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        return null;
      }
    }
    return null;
  }
}
