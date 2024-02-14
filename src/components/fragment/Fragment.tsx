import React from 'react';
import './fragment.css';

export type FragmentProps = {
    description: string;
    title: string;
    icon: string;
};

export const Fragment: React.FC<FragmentProps> = (props) => {
    return (
        <div className={'fragment_container'}>
            <div className={'fragment_title'}>
                {props.description}
            </div>
            <button className={'fragment_button'}>
                <img src={props.icon} alt="icon" className={'fragment_icon'}/>
                <span className={'fragment_button_name'}>{props.title}</span>
            </button>
        </div>
    );
};
