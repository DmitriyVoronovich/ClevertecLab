import {instance} from "../../common/api";

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post('auth/login', data)
    },
    registration(data: LoginParamsType) {
        return instance.post('auth/registration1', data)
    },
    checkEmail(email: CheckEmailParams) {
        return instance.post('auth/check-email', email)
    },
    confirmEmail(data: CodeParamsType) {
        return instance.post('auth/confirm-email', data)
    },
    changePassword(data: PasswordParamsType) {
        return instance.post('auth/change-password', data)
    },
};

export type LoginParamsType = {
    email: string,
    password: string
};

export type CodeParamsType = {
    email: string,
    code: string
};

export type PasswordParamsType = {
    password: string,
    confirmPassword: string,
};

export type CheckEmailParams = {
    email: string
}
