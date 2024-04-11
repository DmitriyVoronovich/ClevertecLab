import {useState} from 'react';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Pagination} from 'antd';

import {sortUserCard} from './utils/sort-user-card.ts';
import {UserCard} from './user-card';

import './user-joint-training-block.css'
import {UserJointTrainingBlockProps} from './types/types.ts';

export const UserJointTrainingBlock = ({filteredUsers, searchString}: UserJointTrainingBlockProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const jointTrainingUserList = useAppSelector((state) => state.training.jointTrainingUserList);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const sortedTrainingList = sortUserCard(currentItems);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='user_joint_training_container'>
                {sortedTrainingList.map((item, index) => (
                    <UserCard key={item.id} user={item} searchString={searchString} index={index}/>
                ))}
            </div>
            <div className='user_joint_training_pagination'>
                <Pagination size="small"
                            defaultCurrent={1}
                            total={jointTrainingUserList.length}
                            pageSize={itemsPerPage}
                            onChange={paginate}
                />
            </div>
        </>

    );
};
