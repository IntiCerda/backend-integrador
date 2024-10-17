import { IsEmail, IsString, MinLength } from 'class-validator';

export class User {
    id: string;

    @IsString()
    @MinLength(1)
    name: string;
  
    @IsString()
    @MinLength(6)
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    password: string;

}
