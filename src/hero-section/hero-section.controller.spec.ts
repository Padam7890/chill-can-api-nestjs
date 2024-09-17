import { Test, TestingModule } from '@nestjs/testing';
import { HeroSectionController } from './hero-section.controller';
import { HeroSectionService } from './hero-section.service';

describe('HeroSectionController', () => {
  let controller: HeroSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroSectionController],
      providers: [HeroSectionService],
    }).compile();

    controller = module.get<HeroSectionController>(HeroSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
