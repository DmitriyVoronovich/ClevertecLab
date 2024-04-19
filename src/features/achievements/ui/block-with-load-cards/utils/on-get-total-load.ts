export const onGetTotalLoad = (training: Array<{ date: string; load: number }>) => training.reduce((acm, item) => acm += item.load, 0);
