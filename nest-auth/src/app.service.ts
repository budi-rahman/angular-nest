import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  } 
  async create(data: any): Promise<User>{
    return this.userRepository.save(data)
  }

  async findOne(condition: any):Promise<User> {
    return this.userRepository.findOne(condition)
  }

  async update(id:string, data: any): Promise<any> {
    return this.userRepository
    .createQueryBuilder()
    .update()
    .set({
      fullname: data.fullname,
      email: data.email,
      password: data.password
    })
    .where('id= :id', {id})
    .execute()
  }

  async delete(id:string): Promise<any> {
    return this.userRepository
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute()
  }
}
