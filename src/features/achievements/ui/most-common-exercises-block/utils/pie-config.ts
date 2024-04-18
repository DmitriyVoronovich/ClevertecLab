import {TrainingDay} from "../types/types.ts";

export const pieConfig = (trainingDays: TrainingDay[], isMobile: boolean) =>{
    return {
        data: trainingDays,
        axis: {
            y: {
                tick: false,
            },
            x: {
                tick: false,
            },
        },
        angleField: 'count',
        colorField: 'mostPopularExercise',
        innerRadius: 0.3,
        radius: 0.4,
        legend: false,
        width: isMobile ? 318 : 520,
        height: isMobile ? 211 : 334,
        style: {
            width: '156px'
        },
        label: {
            text: 'mostPopularExercise',
            style: {
                fontWeight: 'bold',
            },
            connector: false,
            position: 'outside',
            line: false,
        },
    };
}
