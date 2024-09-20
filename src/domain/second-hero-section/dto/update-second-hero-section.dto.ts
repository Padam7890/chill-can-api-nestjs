import { PartialType } from '@nestjs/swagger';
import { CreateSecondHeroSectionDto } from './create-second-hero-section.dto';

export class UpdateSecondHeroSectionDto extends PartialType(CreateSecondHeroSectionDto) {}
