import {Dispatch} from 'react';
import {RequestSettingsStatus} from '@enums/enums.ts';
import {UnknownAction} from '@reduxjs/toolkit';
import {pushWithFlow} from '@utils/pushWithFlow.ts';

import {setSettingsStatus} from '../../../model/settings-slice.ts';

export const onCloseInformationModal = (dispatch: Dispatch<UnknownAction>) => {
        dispatch(setSettingsStatus({settingsStatus: RequestSettingsStatus.Idle}))
        localStorage.removeItem('jwtToken');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('isLoggedIn');
        dispatch(pushWithFlow('/auth'));
};
