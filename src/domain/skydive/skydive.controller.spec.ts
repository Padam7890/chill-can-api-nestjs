import { Test, TestingModule } from '@nestjs/testing';
import { SkydiveController } from './skydive.controller';
import { SkydiveService } from './skydive.service';

describe('SkydiveController', () => {
  let controller: SkydiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkydiveController],
      providers: [SkydiveService],
    }).compile();

    controller = module.get<SkydiveController>(SkydiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
