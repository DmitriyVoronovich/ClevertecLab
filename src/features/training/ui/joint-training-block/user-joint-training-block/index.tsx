import {UserCard} from './user-card';

import './user-joint-training-block.css'
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {useState} from "react";
import {Pagination} from "antd";
import {TrainingPals} from '../../../model/types/types.ts';

type UserJointTrainingBlockProps = {
    filteredUsers: TrainingPals[]
    searchString: string
}

export const UserJointTrainingBlock = ({filteredUsers, searchString}: UserJointTrainingBlockProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const jointTrainingUserList = useAppSelector((state) => state.training.jointTrainingUserList);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const statusOrder: { [index: string]: number } = {
        'accepted': 1,
        'pending': 2,
        'rejected': 3,
        null: 4
    };

    const sortedTrainingList  = currentItems.sort((a, b) => {
        if (statusOrder[a.status] < statusOrder[b.status]) {
            return -1;
        }
        if (statusOrder[a.status] > statusOrder[b.status]) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        return 0;
    });

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
