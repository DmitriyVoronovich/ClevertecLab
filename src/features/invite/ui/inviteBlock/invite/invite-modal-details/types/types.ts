import {InviteParams} from '../../../../../api/types/types.ts';

export type InviteModalDetailsProps = {
    user: InviteParams
    onCloseModal: () => void
    modalStyle: {
        left: number,
        top: number
    }
};
