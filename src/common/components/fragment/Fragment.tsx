import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import './fragment.css';

export type FragmentProps = {
    description: string;
    title: string;
    icon: string;
    callback: () => void;
    dataId: string;
};

export const Fragment = ({ description, title, icon, callback, dataId }: FragmentProps) => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => dispatch(callback());

    return (
        <div className={'fragment_container'}>
            <div className={'fragment_title'}>{description}</div>
            <button className={'fragment_button'} data-test-id={dataId}>
                <img src={icon} alt='icon' className={'fragment_icon'} />
                <span className={'fragment_button_name'} onClick={onClickHandler}>
                    {title}
                </span>
            </button>
        </div>
    );
};
