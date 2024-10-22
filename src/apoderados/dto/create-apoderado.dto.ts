import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateApoderadoDto {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    password: string;

}
