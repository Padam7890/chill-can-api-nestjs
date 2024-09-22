import { PartialType } from '@nestjs/swagger';
import { CreateSkydiveDto } from './create-skydive.dto';

export class UpdateSkydiveDto extends PartialType(CreateSkydiveDto) {}
