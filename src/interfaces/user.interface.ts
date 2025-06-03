export enum UserRoleEnum {
    CUSTOMER = "customer",
    MANAGER = "manager",
}

export interface AuthUser {
    id: string;
    email: string;
    role: UserRoleEnum;
}
