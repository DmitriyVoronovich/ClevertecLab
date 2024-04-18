import {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {API_URL} from '@data/constant.ts';
import {RequestProfileStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/use-is-mobile.ts';
import {Form, message, Upload, UploadProps} from 'antd';

import {profileThunks} from '../../model/profileSlice.ts';

import {AvatarProps, File} from './types/types.ts';

import './avatar.css';

export const Avatar = ({onModalOpen, onButtonDisablet}: AvatarProps) => {
        const dispatch = useAppDispatch();
        const meInformation = useAppSelector(state => state.profile.meInformation);
        const profileStatus = useAppSelector(state => state.profile.profileStatus);
        const avatarUrl = useAppSelector(state => state.profile.avatarUrl);
        const [fileList, setFileList] = useState<File[]>([]);
        const isMobile = useIsMobile();

        useEffect(() => {
            if (meInformation.imgSrc || avatarUrl) {
                const imageSrc = avatarUrl || meInformation.imgSrc
                const url = `${imageSrc.includes('http') ? '' : API_URL}${imageSrc}`;

                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url,
                }])
            }
        }, [meInformation.imgSrc, avatarUrl]);

        useEffect(() => {
            if (profileStatus === RequestProfileStatus.Failed) {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'error',
                }])
            }
        }, [profileStatus])

        const uploadImage = async (options: any) => {
            const {file} = options;

            const fmData = new FormData();

            fmData.append('file', file);
            dispatch(profileThunks.editUserAvatar({avatar: fmData}));
        };

        const handleChange: UploadProps['onChange'] = (info) => {

            if (info.file.status === 'error') {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'error',
                }])
            }
        };

        const uploadButton = (
            <button style={{border: 0, background: 'none'}} type="button">
                <PlusOutlined/>
                <div className="avatar_null_img">
                    <span>Загрузить фото профиля</span>
                </div>
            </button>
        );

        const beforeUpload = (file: any) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                onModalOpen()
                onButtonDisablet()
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'error',
                }]);
            }
        };

        const handleRemove = () => {
            setFileList([]);
            onButtonDisablet()
        };

        return (
            <div className="avatar_container">
                <Form.Item name="imgSrc" data-test-id='profile-avatar'>
                    <Upload
                        locale={{
                            uploading: 'Загружается...',
                        }}
                        multiple={false}
                        listType={isMobile ? 'picture' : 'picture-card'}
                        fileList={fileList}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        customRequest={uploadImage}
                        onRemove={handleRemove}
                    >
                        {!fileList.length && uploadButton}
                    </Upload>
                </Form.Item>
            </div>
        );
    }
;
