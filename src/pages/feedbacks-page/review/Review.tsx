import './review.css';
import ava from '../../../accets/feedback-page/default_avatar.svg'
import {Rate} from "antd";
import {AllReview} from "../../../features/feedback/feeedback.api.ts";
import {StarFilled, StarOutlined} from "@ant-design/icons";

type ReviewProps = {
    item: AllReview
}

const formateDate = (createdAt: string) => {
    const today = new Date(createdAt);
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();

    return `${dd < 10 ? '0' + dd : dd}.${mm < 10 ? '0' + mm : mm}.${yyyy}`;
}

export const Review: React.FC<ReviewProps> = (props) => {
    const {fullName, imageSrc, message, rating, createdAt} = props.item;

    return (
        <div className={'review_container'}>
            <div className={'review_user_wrapper'}>
                <img src={imageSrc ? imageSrc : ava} className={'review_user_avatar'} alt={''}/>
                <span className={'review_user_name'}>{fullName ? fullName : 'Пользователь'}</span>
            </div>
            <div className={'review_text_container'}>
                <div className={'review_rate_wrapper'}>
                    <Rate disabled value={rating}
                          className={'review_rate'}
                          style={{fontSize: 16}}
                          character={({value, index}) => {
                              return value && index! < value ? <StarFilled/> : <StarOutlined/>
                          }}/>
                    <span className={'review_date'}>{formateDate(createdAt)}</span>
                </div>
                <p className={'review_text'}>{message}</p>
            </div>
        </div>
    );
};
