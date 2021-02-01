import React, { useEffect,FC } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { editRecord } from '../service';
import {SingleUserType, FormValues} from '../data'

interface UserModalProps {
    visible:boolean,
    record:SingleUserType | undefined,
    closeHandler:() => void,
    onFinish: (values:any) => void,
    onFinishFailed:(errorInfo: any) => void,
}

const UserModal:FC<UserModalProps> = (props) => {
    const [form] = Form.useForm();
    const {visible, record, closeHandler, onFinish, onFinishFailed } = props
    useEffect( () => {
        if(record === undefined) {
            form.resetFields();
        }else {
            form.setFieldsValue(record);
        }
        
    }, [visible]);

    const onOK = () => {
        form.submit();
    }

    return (
        <div>
            <Modal 
                title="Basic Modal" 
                forceRender
                visible={visible} 
                onOk={onOK} 
                onCancel={closeHandler}>
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="CreateTime"
                        name="create_time"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                    >
                        <Input />
                    </Form.Item>
                    
                </Form>
            </Modal>
        </div>
    )
}

export default UserModal;