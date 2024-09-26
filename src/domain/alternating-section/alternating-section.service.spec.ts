import { Test, TestingModule } from '@nestjs/testing';
import { AlternatingSectionService } from './alternating-section.service';

describe('AlternatingSectionService', () => {
  let service: AlternatingSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlternatingSectionService],
    }).compile();

    service = module.get<AlternatingSectionService>(AlternatingSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
