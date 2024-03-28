import {instance} from '../../../common/api';
import {ProfileInformation} from '../model/types/types.ts';

export const profileApi = {
    getUserInformation() {
        return instance.get('user/me');
    },
    editUserInformation(user: ProfileInformation) {
        return instance.put('user', user);
    },
    editUserAvatar(avatar: any) {
        return instance.post('upload-image', avatar, {
            headers: { 'content-type': 'multipart/form-data' },
        });
    },
};
