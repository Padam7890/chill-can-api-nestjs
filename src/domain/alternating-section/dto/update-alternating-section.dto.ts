import { PartialType } from '@nestjs/swagger';
import { CreateAlternatingSectionDto } from './create-alternating-section.dto';

export class UpdateAlternatingSectionDto extends PartialType(CreateAlternatingSectionDto) {}
