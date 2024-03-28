export type ProfileInformation = {
    email: string,
    firstName: string,
    lastName: string,
    birthday?: string,
    imgSrc: string,
    readyForJointTraining: boolean,
    sendNotification: boolean,
    tariff?: {
        tariffId: string,
        expired: string
    }
};
