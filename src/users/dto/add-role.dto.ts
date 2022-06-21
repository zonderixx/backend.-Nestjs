import { IsNumber, IsString } from "class-validator";

export class addRoleDto {
    @IsString({message: "Must be a string"})
    readonly value: string;
    @IsNumber({}, {message: "Must be a number"})
    readonly userId: number;
}