import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Form, Switch, Tooltip} from 'antd';

import {SwitchProps} from './types.ts';

import '../switch-group.css';

export const SwitchComponent = ({
                                    title,
                                    onChange,
                                    overlayStyle,
                                    dataTestItem,
                                    dataTestIcon,
                                    formItemName,
                                    tooltip,
                                    className,
                                    disabled
                                }: SwitchProps) => (
    <div className='switch_item'>
        <div className={className}>
            <span>{title}</span>
            <Tooltip placement="bottomLeft" title={tooltip}
                     overlayStyle={{width: overlayStyle}}>
                <ExclamationCircleOutlined data-test-id={dataTestIcon} style={{
                    fontSize: '16px',
                    marginLeft: '4px',
                    color: '#8C8C8C'
                }}/>
            </Tooltip>
        </div>
        <Form.Item name={formItemName}>
            <Switch data-test-id={dataTestItem}
                    disabled={disabled}
                    onChange={(value) => onChange(formItemName, value)}/>
        </Form.Item>
    </div>
);
