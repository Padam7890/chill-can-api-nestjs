import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FlavorName } from '../../../core/interfaces/types';



export class CreateFlavorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(FlavorName)
  flavorName: FlavorName;
}

