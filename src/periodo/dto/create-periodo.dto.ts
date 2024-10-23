import {  IsString, MinLength } from 'class-validator';

export class CreatePeriodoDto {
    @IsString()
    @MinLength(1)
    year: string;
}
