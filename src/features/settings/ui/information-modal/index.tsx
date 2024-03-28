import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Modal} from 'antd';

import info from '../../../../accets/settings-page/information_icon.svg'

import {onCloseInformationModal} from './utils/on-close-information-modal.ts';

import './information-modal.css';


export const InformationModal = () => {
    const dispatch = useAppDispatch();
    const meInformation = useAppSelector(state => state.profile.meInformation);

    return (
        <Modal centered={true} open={true} footer={false} width={539} onCancel={() => onCloseInformationModal(dispatch)} data-test-id='tariff-modal-success'>
            <div className='information_modal_container'>
                <img src={info} alt="success_icon" className='information_modal_img'/>
                <h4 className='information_modal_title'>Чек для оплаты у вас на почте</h4>
                <p className='information_modal_description'>Мы отправили инструкцию для оплаты вам на e-mail <span className='email'>{meInformation.email}</span>.
                    После подтверждения оплаты войдите в приложение заново.</p>
                <p className='information_modal_paragraf'>Не пришло письмо? Проверьте папку Спам.</p>
            </div>
        </Modal>
    );
};
