export type TrainingParams = {
    _id?: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId?: string;
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: Array<{
        _id?: string;
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
    }>;
};

export type TrainingList = {
    name: string;
    key: string;
    color: string;
};

export type TrainExercises = {
    _id?: string;
    checkbox?: boolean;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type PostTrainingParams = {
    name: string | undefined;
    date: string;
    isImplementation: boolean;
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: Array<{
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
    }>;
};
