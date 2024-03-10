import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    // 회원가입
    async registerUser(newUser:UserDTO):Promise<UserDTO>{
        let userFind: UserDTO = await this.userService.findByFields({
            where: {username: newUser.username}
        });
        if(userFind){
            throw new HttpException('존재하는 유저 입니다', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    // 로그인
    async validateUser(UserDTO: UserDTO) : Promise<UserDTO | undefined> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: {username: UserDTO.username}
        });
        // 사용자를 찾지 못했을 경우 + 비밀번호가 틀렸을 경우
        if(!userFind || UserDTO.password !== userFind.password) {
            throw new UnauthorizedException();
        }
        return userFind;
    }
}
