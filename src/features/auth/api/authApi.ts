import { instance } from '../../../common/api';

import { CheckEmailParams, CodeParams, LoginParams, PasswordParams } from './types/types.ts';

export const authApi = {
    login(data: LoginParams) {
        return instance.post('auth/login', data);
    },
    registration(data: LoginParams) {
        return instance.post('auth/registration', data);
    },
    checkEmail(email: CheckEmailParams) {
        return instance.post('auth/check-email', email);
    },
    confirmEmail(data: CodeParams) {
        return instance.post('auth/confirm-email', data);
    },
    changePassword(data: PasswordParams) {
        return instance.post('auth/change-password', data);
    },
};
