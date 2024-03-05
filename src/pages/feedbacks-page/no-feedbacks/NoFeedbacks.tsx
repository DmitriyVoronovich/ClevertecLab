import s from './no-feedbacks.module.css';
import {Button} from "antd";

type NoFeedbacksProps = {
    showModalForm: () => void
}

export const NoFeedbacks = (props: NoFeedbacksProps) => {

    return (
        <div className={s.section}>
            <div className={s.section_container}>
                <h5 className={s.section_title}>Оставте свой отзыв первым</h5>
                <p className={s.section_description}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                    Поделитесь своим мнением и опытом с другими пользователями,
                    <br/>и помогите им сделать правильный выбор.</p>
            </div>
            <Button type="primary"
                    className={s.section_button}
                    onClick={props.showModalForm}
                    data-test-id='write-review'>Написать отзыв</Button>
        </div>

    );
};
