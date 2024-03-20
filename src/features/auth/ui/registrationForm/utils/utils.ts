import { AppDispatch } from '@redux/configure-store.ts';
import { LoginParams } from '../../../api/authApi.ts';
import { authThunks } from '../../../model/authSlice.ts';

export const onFinish = (dispatch: AppDispatch) => (values: LoginParams) => {
    const data = { email: values.email, password: values.password };
    sessionStorage.setItem('data-registration', JSON.stringify(data));
    dispatch(authThunks.registration(data));
};
