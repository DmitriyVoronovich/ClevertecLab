import { instance } from '../../../common/api';

import { Review } from './types/types.ts';

export const feedbackApi = {
    getFeedback() {
        return instance.get('feedback');
    },
    createFeedback(data: Review) {
        return instance.post('feedback', data);
    },
};
