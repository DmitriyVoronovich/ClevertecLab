import {VALIDATE_PASSWORD} from '@data/constant.ts';
import { FormInstance } from 'antd/es/form/hooks/useForm';

export const onValidateConfirmPassword = (form: FormInstance) => (password: string) => {

        if (form.getFieldValue('password') !== password) {
            return false;
        }

            return VALIDATE_PASSWORD.test(password);
    };
