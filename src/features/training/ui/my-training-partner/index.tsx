import {useState} from 'react';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';

import {TrainingPals} from '../../model/types/types.ts';
import {UserInformationModal} from '../user-information-modal';

import {UserInformationCard} from './user-infom-card';

import './my-training-partner.css';

export const MyTrainingPartner = () => {
    const trainingPalsList = useAppSelector((state) => state.training.trainingPalsList);
    const [modalOpen, setModalOpen] = useState(false);
    const [userInformation, setUserInformation] = useState({} as TrainingPals);

    const onShowModal = (user: TrainingPals) => {
        setUserInformation(user);
        setModalOpen(true);
    };

    const onCloseModal = () => setModalOpen(false)

    return (<>
            <div className='my_train_partner_container'>
                <h4 className='my_train_partner_title'>Мои партнёры по тренировкам</h4>
                <div className='my_train_card_wrapper'>
                    {trainingPalsList.map((item, index) => (
                        <UserInformationCard user={item} onShowModal={onShowModal} index={index}/>
                    ))}
                </div>
            </div>
            {modalOpen && <UserInformationModal onCloseModal={onCloseModal} user={userInformation}/>}
        </>

    );
};
