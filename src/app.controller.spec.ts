import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, CreateUserDto } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should create, find all, find one, and remove a user', () => {
    const dto: CreateUserDto = { name: 'Maria', email: 'maria@example.com' };
    const created = appController.create(dto);

    expect(created).toMatchObject({
      id: expect.any(Number),
      name: 'Maria',
      email: 'maria@example.com',
    });

    const allUsers = appController.findAll();
    expect(allUsers).toEqual([created]);

    const found = appController.findOne(created.id);
    expect(found).toEqual(created);

    appController.remove(created.id);
    expect(appController.findAll()).toEqual([]);
  });
});
