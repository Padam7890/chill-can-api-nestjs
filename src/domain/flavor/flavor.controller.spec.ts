import { Test, TestingModule } from '@nestjs/testing';
import { FlavorController } from './flavor.controller';
import { FlavorService } from './flavor.service';

describe('FlavorController', () => {
  let controller: FlavorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlavorController],
      providers: [FlavorService],
    }).compile();

    controller = module.get<FlavorController>(FlavorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
