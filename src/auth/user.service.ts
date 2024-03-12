import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { FindOneOptions } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findByFields(options: FindOneOptions<UserDTO>): Promise<User | undefined> {
        return await this.userRepository.findOne(options);
    }

    // 사용자 정보 저장 + 암호화
    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        await this.transformPassword(userDTO);
        console.log(userDTO); 
        return await this.userRepository.save(userDTO);
    }

    // 비밀번호 암호화
    async transformPassword(user: UserDTO): Promise<void> {
        user.password = await bcrypt.hash(
            user.password, 10,
        );
        return Promise.resolve();
    }
}