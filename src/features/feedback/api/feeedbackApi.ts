import {instance} from "../../../common/api";

export const feedbackApi = {
    getFeedback () {
        return instance.get('feedback')
    },
    createFeedback (data: Review) {
        return instance.post('feedback', data)
    }
}

export type AllReview = {
    id: string
    fullName: null | string
    imageSrc: null | string
    message: null | string
    rating: number
    createdAt: string
}

export type Review = {
    message: null | string
    rating: number
}
