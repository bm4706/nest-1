import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { FindOneOptions } from "typeorm";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findByFields(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined>{
        return await this.userRepository.findOne(options);
    }

    async save(UserDTO: UserDTO): Promise <UserDTO | undefined> {
        return await this.userRepository.save(UserDTO);
    }
}