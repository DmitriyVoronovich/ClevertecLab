import {useState} from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/useIsMobile.ts';
import {Input} from 'antd';

import {setSelectedMenuItem} from '../../../model/training-slice.ts';
import {UserJointTrainingBlock} from '../user-joint-training-block';

import './user-joint-training-list.css';

export const UserJointTrainingList = () => {
    const dispatch = useAppDispatch();
    const jointTrainingUserList = useAppSelector((state) => state.training.jointTrainingUserList);
    const [searchString, setSearchString] = useState('');
    const isMobile = useIsMobile();

    const filteredUsers = jointTrainingUserList.filter(user =>
        user.name.toLowerCase().includes(searchString.toLowerCase())
    );

    const onJointTrainingSectionBack = () => {
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
    };



    return (
        <>
            <div className='user_training_list_container'>
                <div className='user_training_top_wrapper'>
                    <button className='user_training_button' onClick={onJointTrainingSectionBack}>
                        <ArrowLeftOutlined size={14} style={{width: '14px'}}/>
                        <span>Назад</span>
                    </button>
                    <Input.Search placeholder="Поиск по имени"
                                  style={isMobile? {width: 270}:{width: 484}}
                                  data-test-id='search-input'
                                  onChange={e => setSearchString(e.target.value)}/>
                </div>
                <UserJointTrainingBlock filteredUsers={filteredUsers} searchString={searchString} />
            </div>
        </>
    );
};
