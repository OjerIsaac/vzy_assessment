import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
