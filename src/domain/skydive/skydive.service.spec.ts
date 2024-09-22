import { Test, TestingModule } from '@nestjs/testing';
import { SkydiveService } from './skydive.service';

describe('SkydiveService', () => {
  let service: SkydiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkydiveService],
    }).compile();

    service = module.get<SkydiveService>(SkydiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
