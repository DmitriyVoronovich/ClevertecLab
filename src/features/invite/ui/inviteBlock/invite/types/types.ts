import {InviteParams} from "../../../../api/types/types.ts";

export type InviteProps = {
    user: InviteParams
    onOpenModalWithDetails: (e: any, user: InviteParams) => void
    onAcceptedInvite: (item: InviteParams) => void
    onRejectedInvite: (item: InviteParams) => void
}
