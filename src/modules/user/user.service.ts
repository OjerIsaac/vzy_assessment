import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private logModel: Model<User>) {}

    async createUser(data: Log): Promise<Log> {
        const newLog = await this.logModel.create(log);
        return newLog.save();
    }
}
