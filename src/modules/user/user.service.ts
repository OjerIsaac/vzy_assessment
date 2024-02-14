import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.interface";
import { CreateUserInput } from "./user.model";
import { getHashedPassword } from "../../lib/auth";

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

    async createUser(data: CreateUserInput): Promise<User> {
        const doesUserExist = await this.checkIfUserExist({
            email: data.email,
        });

        if (doesUserExist) {
            return null;
        }

        const hashedPassword = getHashedPassword(data.password);
        const user = await this.userModel.create({
            ...data,
            password: hashedPassword,
        });
        return user;
    }

    async checkIfUserExist({ email }: { email: string }): Promise<boolean> {
        if (!email) {
            return true;
        }
        const userCount = await this.userModel.countDocuments({ email });
        return userCount > 0;
    }

    async getUserByEmailWithPassword(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).select("+password").exec();
    }
}
