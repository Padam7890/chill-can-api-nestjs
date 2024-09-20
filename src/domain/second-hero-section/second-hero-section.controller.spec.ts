import { Test, TestingModule } from '@nestjs/testing';
import { SecondHeroSectionController } from './second-hero-section.controller';
import { SecondHeroSectionService } from './second-hero-section.service';

describe('SecondHeroSectionController', () => {
  let controller: SecondHeroSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecondHeroSectionController],
      providers: [SecondHeroSectionService],
    }).compile();

    controller = module.get<SecondHeroSectionController>(SecondHeroSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
