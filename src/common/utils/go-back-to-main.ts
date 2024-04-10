import {Dispatch} from 'react';
import {UnknownAction} from '@reduxjs/toolkit';
import {pushWithFlow} from '@utils/pushWithFlow.ts';

export const goBackToMain = (dispatch: Dispatch<UnknownAction>) => {
    return () => dispatch(pushWithFlow('/main'));
}
