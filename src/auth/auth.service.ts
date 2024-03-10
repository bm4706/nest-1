import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

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
    async validateUser(UserDTO: UserDTO) : Promise<string | undefined> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: {username: UserDTO.username}
        });
        // 암호화 확인
        const validatePassword = await bcrypt.compare(UserDTO.password, userFind.password) /*입력한 비밀번호와 db에 저장된 비밀번호 비교*/
        // 사용자를 찾지 못했을 경우 + 비밀번호가 틀렸을 경우
        if(!userFind || !validatePassword) {
            throw new UnauthorizedException('로그인 실패!');
        }
        return "로그인 성공!";
    }

    
}
