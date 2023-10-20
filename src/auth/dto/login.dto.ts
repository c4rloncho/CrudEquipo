import { IsEmail, MinLength, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {

    @IsEmail()
    readonly email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    readonly password: string;

}