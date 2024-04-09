import {useState} from "react";
import Highlighter from "react-highlight-words";
import {CheckCircleFilled, ExclamationCircleOutlined} from "@ant-design/icons";
import {InvitationToJointTraining, TrainingSelectedMenu} from "@enums/enums.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {Avatar, Button, Card, Tooltip} from "antd";

import avatar from '../../../../../../assets/feedback-page/default_avatar.svg';
import {
    setInvitationMode,
    setSelectedMenuItem,
    setUserId,
    trainingThunks
} from "../../../../model/training-slice.ts";
import {TrainingPals} from "../../../../model/types/types.ts";
import {AddTrainingDrawerModal} from "../../../add-training-drawer-modal";

import './user-card.css';

type UserCardProps = {
    user: TrainingPals
    searchString: string
    index: number
}

export const UserCard = ({user, searchString, index}: UserCardProps) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const name = user.name.split(' ');
    const secondName = user.name.split(' ');
    const onCloseDrawer = () => {
        dispatch(setInvitationMode({invitationMode: InvitationToJointTraining.Invitation}));
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
        setOpen(false)
    };

    const onOpenDrawer = () => setOpen(true);

    const onAddTraining = () => {
        dispatch(setInvitationMode({invitationMode: InvitationToJointTraining.Invitation}));
        dispatch(setUserId({userId: user.id}));
        onOpenDrawer()
    }

    return (
        <>
            <Card bordered={false} style={{width: 234}} className='card' data-test-id={`joint-training-cards${index}`}>
                <div className='card_header_wrapper'>
                    <Avatar size={42} src={user.imageSrc ? user.imageSrc : avatar}/>
                    <h6 className='card_header_title'>
                        <Highlighter
                            highlightClassName="highligh_text"
                            searchWords={[searchString]}
                            autoEscape={true}
                            textToHighlight={user.name}
                        />
                    </h6>
                </div>
                <div className='card_information_wrapper'>
                    <div className='card_description_wrapper'>
                        <span className='card_description_title'>Тип тренировки:</span>
                        <span className='card_description_text'>{user.trainingType}</span>
                    </div>
                    <div className='card_description_wrapper'>
                        <span className='card_description_title'>Средняя нагрузка:</span>
                        <span className='card_description_text'>{user.avgWeightInWeek} кг/нед</span>
                    </div>
                </div>
                {user.status === null
                    ? <div className='card_footer_wrapper' style={{paddingBottom: '28px'}}>
                        <Button className='card_button'
                                onClick={onAddTraining}
                                style={{color: '#ffffff', background: '#2f54eb'}}>
                            Создать тренировку</Button>
                    </div>
                    : user.status === 'accepted'
                        ? <div className='card_footer_wrapper'>
                            <Button className='card_button'>
                                Отменить тренировку
                            </Button>
                            <div className='card_footer_description'>
                                <span className='card_footer_description_text'>тренировка одобрена</span>
                                <CheckCircleFilled style={{color: '#52C41A'}} size={14}/>
                            </div>
                        </div>
                        : user.status === 'pending'
                            ? <div className='card_footer_wrapper'>
                                <Button className='card_button' onClick={onAddTraining} disabled={true}>Создать
                                    тренировку</Button>
                                <span className='card_footer_description_text'>ожидает подтверждения</span>
                            </div>
                            : <div className='card_footer_wrapper'>
                                <Button className='card_button' onClick={onAddTraining} disabled={true}>Создать
                                    тренировку</Button>
                                <div className='card_footer_description'>
                                    <span className='card_footer_description_text'>тренировка отклонена</span>
                                    <Tooltip placement="topRight" title="повторный запрос будет доступнен через 2 недели"
                                             overlayStyle={{width: 147}}>
                                        <ExclamationCircleOutlined style={{
                                            fontSize: '16px',
                                            marginLeft: '4px',
                                            fill: '#8C8C8C'
                                        }}/>
                                    </Tooltip>
                                </div>
                            </div>}
            </Card>
            {open && <AddTrainingDrawerModal onClose={onCloseDrawer} user={user}/>}
        </>
    );
};
