import { Transform } from "class-transformer";
import { IsString, IsEmail, minLength, MinLength } from "class-validator";

export class RegisterDto{
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(4)
    readonly username: string;

    
    @IsEmail()
    readonly email: string;
    
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    readonly password: string;

    

}