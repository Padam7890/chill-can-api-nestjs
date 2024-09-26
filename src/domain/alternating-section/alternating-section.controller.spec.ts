import { Test, TestingModule } from '@nestjs/testing';
import { AlternatingSectionController } from './alternating-section.controller';
import { AlternatingSectionService } from './alternating-section.service';

describe('AlternatingSectionController', () => {
  let controller: AlternatingSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlternatingSectionController],
      providers: [AlternatingSectionService],
    }).compile();

    controller = module.get<AlternatingSectionController>(AlternatingSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
