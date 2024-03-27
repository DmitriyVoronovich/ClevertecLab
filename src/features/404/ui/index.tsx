import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {pushWithFlow} from '@utils/pushWithFlow.ts';
import {Button} from 'antd';

import not_found from '../../../accets/404/404.png';

import s from './not-found-page.module.css';

export const NotFoundPage = () => {
    const dispatch = useAppDispatch();

    const onMainPageBack = () => dispatch(pushWithFlow('/main'));

    return (
        <div className={s.not_found_page_container}>
            <div className={s.not_found_page_wrapper}>
                <div className={s.not_found_page_content}>
                    <div className={s.not_found_page_information}>
                        <img src={not_found} alt="error image" className={s.not_found_page_img}/>
                        <h4 className={s.not_found_page_title}>Такой страницы нет</h4>
                        <p className={s.not_found_page_description}>Извините, страница не найдена, возможно, она была удалена или перемещена.</p>
                        <Button className={s.not_found_page_button} onClick={onMainPageBack}>На главную</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
