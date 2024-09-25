import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class signInDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    @ApiProperty()
    password: string;
}

export class forgetPasswordDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;
}

export class resetPasswordDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    token: string;
}
