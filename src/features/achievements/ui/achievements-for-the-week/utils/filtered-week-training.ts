import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onFilteredWeekTraining = (training: TrainingParams[]) => {
    const now = new Date();

    now.setUTCHours(0, 0, 0, 0);
    const today = now.getTime();

    const sevenDaysAgo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6));
    const sevenDaysAgoTime = sevenDaysAgo.getTime();

    return training.filter(item => {
        // строки с датами в формате ISO или с миллисекундами могут быть переданы в конструктор Date
        const itemDate = new Date(item.date);

        itemDate.setUTCHours(0, 0, 0, 0);
        const itemDateTime = itemDate.getTime();

        return itemDateTime >= sevenDaysAgoTime && itemDateTime <= today;
    });
};
