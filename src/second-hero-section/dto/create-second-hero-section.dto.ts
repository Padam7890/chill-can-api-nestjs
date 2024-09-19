import { IsNotEmpty,  IsString } from "class-validator";

export class CreateSecondHeroSectionDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    subTitle: string;

    @IsNotEmpty()
    @IsString()
    heroContent: string;

    @IsString()
    heroButtonLink: string;

    @IsNotEmpty()
    heroImage: string;
}
