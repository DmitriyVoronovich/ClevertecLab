import {instance} from '../../../common/api';
import {Invitation, ResponseInvitation} from "./types/types.ts";

export const inviteApi = {
    sendAnInvitation: (invitation: Invitation) => instance.post('invite', invitation),
    getInvite: () => instance.get('invite'),
    responseToInvitation: (res:ResponseInvitation) => instance.put('invite', (res)),
    removeInvitation: (id: string) => instance.delete(`invite/${id}`)
}


