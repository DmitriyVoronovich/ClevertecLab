export type LoginParams = {
    imgSrc: string;
    birthday: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
};

export type CodeParams = {
    email: string;
    code: string;
};

export type PasswordParams = {
    password: string;
    confirmPassword: string;
};

export type CheckEmailParams = {
    email: string;
};
