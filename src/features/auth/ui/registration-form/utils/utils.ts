import { AppDispatch } from '@redux/configure-store.ts';

import { authThunks } from '../../../model/auth-slice.ts';

export const onFinish = (dispatch: AppDispatch) => (values: { email: string, password: string }) => {
    const data = { email: values.email, password: values.password };

    sessionStorage.setItem('data-registration', JSON.stringify(data));
    dispatch(authThunks.registration(data));
};
