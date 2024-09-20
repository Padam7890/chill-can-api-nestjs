import { Test, TestingModule } from '@nestjs/testing';
import { SecondHeroSectionService } from './second-hero-section.service';

describe('SecondHeroSectionService', () => {
  let service: SecondHeroSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecondHeroSectionService],
    }).compile();

    service = module.get<SecondHeroSectionService>(SecondHeroSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
