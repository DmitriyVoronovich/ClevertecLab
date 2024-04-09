import {Avatar, Card} from "antd";
import avatar from "@image/feedback-page/default_avatar.svg";
import {TrainingPals} from "../../../model/types/types.ts";
import './user-information-card.css'

type UserInfomationCard = {
    user: TrainingPals
    onShowModal: (user: TrainingPals) => void
    index: number
}

export const UserInformationCard = ({user, onShowModal, index}: UserInfomationCard) => {

    return (
        <Card className='.card_partner_container' style={{background: '#ffffff', padding: '12px', width: 234}} onClick={() => onShowModal(user)}
              data-test-id={`joint-training-cards${index}`}>
            <div className='card_header_wrapper'>
                <Avatar size={42} src={user.imageSrc ? user.imageSrc : avatar}/>
                <h6 className='card_header_title'>
                    {user.name}
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
        </Card>
    );
};
