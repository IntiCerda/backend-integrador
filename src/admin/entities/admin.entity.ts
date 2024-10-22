import {IsString, MinLength, IsEmail } from 'class-validator';

export class Admin {

    id: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

}
