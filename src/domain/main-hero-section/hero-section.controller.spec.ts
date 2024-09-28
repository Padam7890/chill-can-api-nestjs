import { Test, TestingModule } from '@nestjs/testing';
import { HeroSectionController } from './hero-section.controller';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../../lib/cloudinary/cloudinary.module';
import { MailerService } from '@nestjs-modules/mailer';
import { CloudinaryService } from '../../lib/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

describe('HeroSectionController', () => {
  let controller: HeroSectionController;
  let service: HeroSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule, AuthModule, CloudinaryModule],
      controllers: [HeroSectionController],
      providers: [
        {
          provide: HeroSectionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked-value'), // Mock specific config values if necessary
          },
        },
      ],
    }).compile();

    controller = module.get<HeroSectionController>(HeroSectionController);
    service = module.get<HeroSectionService>(HeroSectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new hero section', async () => {
      const createHeroSectionDto: CreateHeroSectionDto = {
        title: 'Test Title',
        subTitle: 'Test Subtitle',
        heroContent: 'Test Hero Content',
        heroButtonLink: 'Test Hero Button Link',
      };

      // Mock service return value
      const mockCreatedHeroSection = {
        data: {
          id: '1',
          ...createHeroSectionDto,
        },
      };

      // Mock the service's create method
      jest.spyOn(service, 'create').mockResolvedValue(mockCreatedHeroSection as any);

      const result = await controller.create(createHeroSectionDto);

      // Assertions to check if the returned value is correct
      expect(result).toBeDefined();
      expect(result.data.title).toBe(createHeroSectionDto.title);
      expect(result.data.subTitle).toBe(createHeroSectionDto.subTitle);
      expect(result.data.heroContent).toBe(createHeroSectionDto.heroContent);
      expect(result.data.heroButtonLink).toBe(createHeroSectionDto.heroButtonLink);

      // Ensure the service's create method was called with the correct data
      expect(service.create).toHaveBeenCalledWith(createHeroSectionDto);
    });
  });
});
