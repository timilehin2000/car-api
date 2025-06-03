import { UserRoleEnum } from "../interfaces";
import { Iuser, User } from "../models";
import {
    BadRequestError,
    ConflictError,
    JWTService,
    PasswordHelper,
} from "../utils";

export class UserService {
    async registerUser(data: {
        email: string;
        password: string;
        fullName: string;
        role: UserRoleEnum;
    }) {
        const emailExist = await this.findByEmail(data.email);
        console.log(emailExist);
        if (emailExist) {
            throw new ConflictError("Email already exists");
        }

        const hashedPassword = await PasswordHelper.hashPassword(data.password);

        const registeredUser = await this.save({
            ...data,
            email: data.email.toLowerCase(),
            role: data?.role || UserRoleEnum.CUSTOMER,
            password: hashedPassword,
        });

        return this.signUserToken(registeredUser);
    }

    private async signUserToken(user: Iuser) {
        const userInfo: any = {
            role: user.role,
            email: user.email,
            id: user.id,
        };

        const token = JWTService.sign(userInfo);

        return {
            ...userInfo,
            accessToken: token,
        };
    }

    async login(data: { email: string; password: string }) {
        const user = await this.findByEmail(data.email);

        const isPasswordCorrect = user
            ? await PasswordHelper.comparePassword(data.password, user.password)
            : null;

        if (!user || !isPasswordCorrect) {
            throw new BadRequestError("Invalid email or password");
        }

        return this.signUserToken(user);
    }

    private async findByEmail(email: string) {
        return await User.findOne({ email });
    }

    private async save(data: any) {
        return await new User(data).save();
    }
}
