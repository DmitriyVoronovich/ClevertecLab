import React from 'react';
import {FormInstance} from 'antd/es/form/hooks/useForm';

import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export type EditTrainingFormProps = {
    setFormSubmit: React.Dispatch<React.SetStateAction<FormInstance | undefined>>;
    onFinish: (value: any,) => void
    separateWorkout: TrainingParams
    onUnDisabledEditButton: () => void
};

export type EditTrainingFormListProps = {
    removeValue: () => void
    handleCheckboxChange: (e: any, name: string) => void
    someCheckbox: boolean
}
