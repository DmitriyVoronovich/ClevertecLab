import {Drawer} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import './darwelModal.css'
import Badge from "antd/lib/badge";
import {formateDate} from "./utils/formateDate.ts";
import {DrawerForm} from "../drawerForm/DrawerForm.tsx";


export const DrawerModal = () => {
    const [open, setOpen] = useState(true);
    const [values, setValues] = useState([]);
    const [form, setForm] = useState(null);
    const date = '2022-05-30T00:00:00.000Z'

    const addItem = (value: any) => {
        setValues(value)
    }

    const onClose = () => {
        setOpen(false);
        if (form) {
            // @ts-ignore
            form.submit();
        }
    };

    return (
        <Drawer
            title="Добавление упражнений"
            width={408}
            onClose={onClose}
            open={open}
            mask={false}
            maskClosable={false}
            className={'drawer_container'}
            extra={
                <PlusOutlined style={{width: '14px', height: '14px'}} />
            }
        >
            <div className={'info_section'}>
                <Badge color="#f50" text="Силовая" style={{fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '130%',
                    color: '#8C8C8C'}}/>
                <span className={'info_date'}>{formateDate(date)}</span>
            </div>
            <DrawerForm addItem={addItem} setFormSubmit={setForm}/>
        </Drawer>
    );
};
