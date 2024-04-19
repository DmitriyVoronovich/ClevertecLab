import {VALIDATE_EMAIL} from '@data/constant.ts';

export const onValidateEmail = (
    setIsRepeatButtonDisabled: (value: ((prevState: boolean) => boolean) | boolean) => void,
) => (email: string) => {

        if (VALIDATE_EMAIL.test(email)) {
            setIsRepeatButtonDisabled(false);
        }

        return VALIDATE_EMAIL.test(email);
    };
