import React from 'react';
import {FormInstance} from 'antd/es/form/hooks/useForm';

export type AddTrainingDrawerFormProps = {
    setFormSubmit: React.Dispatch<React.SetStateAction<FormInstance | undefined>>;
    onFinish: (value: any, periodicityOpen: boolean) => void
    onDisabledSaveButton: () => void
    onUnDisabledSaveButton: () => void
}
