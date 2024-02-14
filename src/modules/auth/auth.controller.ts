import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserInput } from "../user/user.model";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Controller({ path: "auth", version: "1" })
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post("/signup")
    async signup(@Body() payload: CreateUserInput, @Res() res: Response) {
        const isUserCreated = await this.userService.createUser(payload);
        if (!isUserCreated) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email already taken",
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        return res.status(HttpStatus.CREATED).json({
            message: "Signup successful",
            statusCode: HttpStatus.CREATED,
        });
    }
}
