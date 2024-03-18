import {FormInstance} from "antd/es/form/hooks/useForm";

export const onValidateConfirmPassword = (form: FormInstance<any>) => {
    return (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (form.getFieldValue('password') !== password) {
            return false;
        } else {
            return re.test(password);
        }
    };
}
