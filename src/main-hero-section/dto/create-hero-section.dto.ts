// model MainHeroSection {
//     id             Int      @id @default(autoincrement())
//     title          String
//     subTitle       String
//     heroContent    String
//     heroButtonLink String
//     createdAt      DateTime @default(now())
//     updatedAt      DateTime @updatedAt

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

//   }
export class CreateHeroSectionDto {

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    subTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    heroContent: string;

    @ApiProperty()
    @IsNotEmpty()
    heroButtonLink: string;

}
