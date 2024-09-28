import { Test, TestingModule } from '@nestjs/testing';
import { AlternatingSectionController } from './alternating-section.controller';
import { AlternatingSectionService } from './alternating-section.service';
import { DatabaseModule } from 'src/database/database.module';

describe('AlternatingSectionController', () => {
  let controller: AlternatingSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule,],
      controllers: [AlternatingSectionController],
      providers: [AlternatingSectionService],
    }).compile();

    controller = module.get<AlternatingSectionController>(AlternatingSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
