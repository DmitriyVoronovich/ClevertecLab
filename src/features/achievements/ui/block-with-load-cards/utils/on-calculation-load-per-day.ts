export const onCalculationLoadPerDay = (totalLoad: number, training: Array<{ date: string; load: number }>) => totalLoad / training.filter((item) => !!item.load).length
