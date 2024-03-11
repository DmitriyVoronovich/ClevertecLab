import React from 'react';
import './fragment.css';
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";

export type FragmentProps = {
    description: string;
    title: string;
    icon: string;
    callback: any;
};

export const Fragment: React.FC<FragmentProps> = (props) => {
    const dispatch = useAppDispatch();
    const {description, title, icon, callback} = props;

    const onClickHandler = () => {
        dispatch(callback())
    };

    return (
        <div className={'fragment_container'}>
            <div className={'fragment_title'}>
                {description}
            </div>
            <button className={'fragment_button'}>
                <img src={icon} alt="icon" className={'fragment_icon'}/>
                <span className={'fragment_button_name'} onClick={onClickHandler}>{title}</span>
            </button>
        </div>
    );
};
