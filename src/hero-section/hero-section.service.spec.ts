import { Test, TestingModule } from '@nestjs/testing';
import { HeroSectionService } from './hero-section.service';

describe('HeroSectionService', () => {
  let service: HeroSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroSectionService],
    }).compile();

    service = module.get<HeroSectionService>(HeroSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
