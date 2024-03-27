import React from 'react';
import { FormInstance } from 'antd/es/form/hooks/useForm';

import { TrainExercises } from '../../../model/types/types.ts';

export type DrawerFormProps = {
    addItem: (value: TrainExercises[]) => void;
    setFormSubmit: React.Dispatch<React.SetStateAction<FormInstance | undefined>>;
    trainExercise: TrainExercises[];
};

export type FinishValues = {
    exercise: TrainExercises[];
};
