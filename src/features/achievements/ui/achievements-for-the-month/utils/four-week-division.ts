import {LoadByDateItem} from '../types/types.ts';

export const  onFourWeekDivision = (selectedTraining:  LoadByDateItem[]) => {
    const numSubArrays = 4;
    const lenSubArray = 7;
    const newArray = [];

    for (let i = 0; i < numSubArrays; i++) {
        newArray.push(selectedTraining.slice(i * lenSubArray, (i + 1) * lenSubArray));
    }

    return newArray;
};
