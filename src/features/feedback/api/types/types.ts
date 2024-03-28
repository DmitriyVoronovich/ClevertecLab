export type AllReview = {
    id: string;
    fullName: null | string;
    imageSrc: null | string;
    message: null | string;
    rating: number;
    createdAt: string;
};

export type Review = {
    message: null | string;
    rating: number;
};
