
import {useState} from 'react';
import {TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/useIsMobile.ts';
import classNames from 'classnames';

import {setSelectedMenuItem} from '../../../training/model/training-slice.ts';
import {InviteParams} from '../../api/types/types.ts';
import {inviteThunks} from '../../model/invite-slice.ts';

import {InviteModalDetails} from './invite/invite-modal-details';
import {Invite} from './invite'

import './invite.css';

const InviteBlock = () => {
    const dispatch = useAppDispatch();
    const inviteList = useAppSelector((state) => state.invite.inviteList);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [modalStyle, setModalStyle] = useState({left: 0, top: 0});
    const [userInvite, setUserInvite] = useState({} as InviteParams);
    const [userInviteNumber, setUserInviteNumber] = useState(false);
    const isMobile = useIsMobile();

    const inviteWrapper = classNames({invite_wrapper: !userInviteNumber});

    const onOpenModalWithDetails = (e: any, user: InviteParams) => {
        setOpenDetailsModal(true);
        const rect = e.currentTarget.getBoundingClientRect();

        setUserInvite(user);

        setModalStyle(isMobile?  {left: rect.x - 75, top: rect.y - 5} : {left: rect.x, top: rect.y});
    };

    const onCloseModalWithDetails = () => setOpenDetailsModal(false);

    const onAcceptedInvite = (item: InviteParams) => {
        dispatch(inviteThunks.resToInvite({arg: {id: item._id, status: 'accepted'}}));
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.MyTrainingPartner}));
    };

    const onRejectedInvite = (item: InviteParams) => {
        dispatch(inviteThunks.resToInvite({arg: {id: item._id, status: 'rejected'}}));
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
    };

    const onWrapperOpen = () => setUserInviteNumber(true);

    const onWrapperClose = () => setUserInviteNumber(false);

    return (
        <>
            <div className='invite_container'>
                <p className='invite_notification'>Новое сообщение ({inviteList.length})</p>
                <div className={inviteWrapper}>
                    {userInviteNumber ? inviteList.map((item) => (
                            <Invite onAcceptedInvite={onAcceptedInvite}
                                    user={item}
                                    onRejectedInvite={onRejectedInvite}
                                    onOpenModalWithDetails={onOpenModalWithDetails}
                                    key={item._id}
                            />))
                        :
                        <Invite onAcceptedInvite={onAcceptedInvite}
                                user={inviteList[0]}
                                onRejectedInvite={onRejectedInvite}
                                onOpenModalWithDetails={onOpenModalWithDetails}
                                key={inviteList[0]._id}
                        />
                    }
                </div>
                {inviteList.length > 1
                    && <span>{userInviteNumber
                        ? <span className='invite_button_target'
                                onClick={onWrapperClose}>Свернуть приглашения</span>
                        :
                        <span className='invite_button_target' onClick={onWrapperOpen}>Показать все приглашения</span>}</span>
                }
            </div>
            {
                openDetailsModal &&
                <InviteModalDetails user={userInvite}
                                    onCloseModal={onCloseModalWithDetails}
                                    modalStyle={modalStyle}/>
            }
        </>);
};

export default InviteBlock;
