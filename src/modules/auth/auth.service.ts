import { Injectable } from "@nestjs/common";
import { comparePassword } from "../../lib/auth";
import { JWTPayload } from "../../lib/types";
import { JwtService } from "@nestjs/jwt";
import { JwtSignOptions } from "@nestjs/jwt/dist/interfaces";
import { User } from "../user/user.interface";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async getUserToken(user: User, password: string) {
        if (!comparePassword(password, user.password)) {
            return null;
        }

        return this.getToken(user);
    }

    async getToken(user: User, options?: JwtSignOptions) {
        const payload: JWTPayload = {
            email: user.email,
            sub: user.id,
        };

        return this.jwtService.sign(payload, options);
    }
}
