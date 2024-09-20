import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString } from "class-validator";

export class CreateSecondHeroSectionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subTitle: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    heroContent: string;

     
    @ApiProperty()
    @IsNotEmpty()
    heroButtonLink: string;

    heroImage:string;

}
