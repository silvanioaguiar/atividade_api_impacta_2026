import { Injectable } from '@nestjs/common';

export class CreateUserDto {
  name: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class AppService {
  private users: User[] = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      name: createUserDto.name,
      email: createUserDto.email,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}
