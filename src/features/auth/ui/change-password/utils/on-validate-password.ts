import {VALIDATE_PASSWORD} from '@data/constant.ts';

export const onValidatePassword = (
    setIsPasswordValid: (value: ((prevState: boolean) => boolean) | boolean) => void,
) => (password: string) => {

        const isValid = VALIDATE_PASSWORD.test(password);

        setIsPasswordValid(isValid);

        return isValid;
    };
