import React from 'react';
import { FormInstance } from 'antd/es/form/hooks/useForm';

import { TrainExercises } from '../../../model/types/types.ts';

export type WorkoutEditFormProps = {
    addItem: (value: ExerciseItem[]) => void;
    setFormSubmit?: React.Dispatch<React.SetStateAction<FormInstance>>;
    trainExercise: TrainExercises[];
};

export type ExerciseItem = {
    checkbox?: boolean;
    name: string;
    approaches: number;
    weight: number;
    replays: number;
};

export type InputFormItemProps = {
    name: number;
    handleCheckboxChange: any;
    index: number;
    restField: any;
};
