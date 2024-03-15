import React from 'react';
import './fragment.css';
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";

export type FragmentProps = {
    description: string;
    title: string;
    icon: string;
    callback: any;
    dataId: string
};

export const Fragment: React.FC<FragmentProps> = (props) => {
    const dispatch = useAppDispatch();
    const {description, title, icon, callback, dataId} = props;

    const onClickHandler = () => {
        dispatch(callback())
    };

    return (
        <div className={'fragment_container'}>
            <div className={'fragment_title'}>
                {description}
            </div>
            <button className={'fragment_button'} data-test-id={dataId}>
                <img src={icon} alt="icon" className={'fragment_icon'}/>
                <span className={'fragment_button_name'} onClick={onClickHandler}>{title}</span>
            </button>
        </div>
    );
};
