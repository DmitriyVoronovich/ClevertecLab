import {FragmentProps} from '@components/fragment/types/types.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

import './fragment.css';

export const Fragment = ({ description, title, icon, callback, dataId }: FragmentProps) => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => dispatch(callback);

    return (
        <div className="fragment_container">
            <div className="fragment_title">{description}</div>
            <button type='button' className="fragment_button" data-test-id={dataId}>
                <img src={icon} alt='icon' className="fragment_icon" />
                <span onKeyDown={onClickHandler} tabIndex={0} role="button" className="fragment_button_name" onClick={onClickHandler}>
                    {title}
                </span>
            </button>
        </div>
    );
};
