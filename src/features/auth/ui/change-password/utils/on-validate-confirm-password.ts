import { FormInstance } from 'antd/es/form/hooks/useForm';

import {VALIDATE_PASSWORD} from '../../../../../data/constant.ts';

export const onValidateConfirmPassword = (form: FormInstance<any>) => (password: string) => {

        if (form.getFieldValue('password') !== password) {
            return false;
        }

            return VALIDATE_PASSWORD.test(password);
    };
