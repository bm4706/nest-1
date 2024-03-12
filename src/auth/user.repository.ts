import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

export class UserRepository extends Repository<User> {
  // 사용자 정의 메서드 및 로직을 여기에 추가할 수 있습니다.
}
