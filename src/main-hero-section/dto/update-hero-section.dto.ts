import { PartialType } from '@nestjs/swagger';
import { CreateHeroSectionDto } from './create-hero-section.dto';

export class UpdateHeroSectionDto extends PartialType(CreateHeroSectionDto) {}
