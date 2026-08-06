import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { CreateUserDto, User } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.appService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    const user = this.appService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    const deleted = this.appService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
  }
}
