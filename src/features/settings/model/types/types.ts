export type TrafficList = {
    _id: string,
    name: string,
    periods: Traffic[]
}

export type Traffic = {
    text: string,
    cost: number,
    days: number
}
