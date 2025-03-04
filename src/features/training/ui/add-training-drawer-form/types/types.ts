import React from 'react';
import {FormInstance} from 'antd/es/form/hooks/useForm';
import {TrainingPals} from "../../../model/types/types.ts";

export type AddTrainingDrawerFormProps = {
    setFormSubmit?: React.Dispatch<React.SetStateAction<FormInstance>>;
    onFinish: (value: any, periodicityOpen: boolean) => void
    onDisabledSaveButton: () => void
    onUnDisabledSaveButton: () => void
    user?: TrainingPals
};

export type AddTrainingFormListProps = {
    onDisabledSaveButton: () => void
};
