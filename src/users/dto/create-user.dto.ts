import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class createUserDto {

    @ApiProperty({example: 'user@gmail.com', description: 'email'})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'password'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Not less than 4 and not more than 16'})
    readonly password: string;
}