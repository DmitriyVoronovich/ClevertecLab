import {instance} from '../../../common/api';

export const inviteApi = {
    sendAnInvitation: (invitation: Invitation) => instance.post('invite', invitation),
    getInvite: () => instance.get('invite'),
    responseToInvitation: (res:ResponseInvitation) => instance.put('invite', (res)),
    removeInvitation: (id: string) => instance.delete(`invite/${id}`)
}

export type Invitation = {
    to: string
    trainingId: string
}

export type ResponseInvitation = {
    id: string
    status: 'accepted' | 'rejected'
}

export type InviteParams = {
    _id: string,
    from: {
        _id: string,
        firstName: string | null,
        lastName: string | null,
        imageSrc: string | null
    },
    training: {
        _id: string,
        name: string,
        date: string,
        isImplementation: boolean,
        userId: string,
        parameters: {
            repeat: boolean,
            period: number,
            jointTraining: boolean,
            participants: string[]
        },
        exercises: [
            {
                _id: string,
                name: string,
                replays: number,
                weight: number,
                approaches: number,
                isImplementation: boolean
            }
        ]
    },
    status: string,
    createdAt: string
}
