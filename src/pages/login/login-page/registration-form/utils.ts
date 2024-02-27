import {LoginParamsType} from "../../../../features/auth/auth.api.ts";
import {authThunks} from "../../../../features/auth/auth.reducer.ts";
import {AppDispatch} from "@redux/configure-store.ts";


export const onFinish = (dispatch:  AppDispatch) => (values: LoginParamsType) => {
    console.log('Received values of form: ', values);
    const data = {email: values.email, password: values.password};
    sessionStorage.setItem('data-registration', JSON.stringify(data));
    dispatch(authThunks.registration(data));
};
