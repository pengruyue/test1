import React, { Component , useState, FC, useRef} from 'react';
import { Table, Tag, Space, Modal, Button, Popconfirm, Pagination } from 'antd';
import { connect, Loading, useRequest, UserState, Dispatch } from 'umi';
import {getRemoteList } from './service';
import UserModal from './components/UserModal';
import {SingleUserType,FormValues} from './data'
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';

import request from 'umi-request';

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
}


interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const UserListPage:FC<UserPageProps> = ({users,dispatch,userListLoading}) => {
  const [modalVisible,setModalVisible] = useState(false)
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined)
  const ref = useRef<ActionType>();
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render : (text:string) => <a>{text}</a>
        },
        {
          title: 'CreateTime',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        
        {
          title: 'Action',
          key: 'action',
          render: (text:string, record: SingleUserType) => (
            <Space size="middle">
              <a 
                onClick = {() => {
                  editHandle(record)
                }}
              >
                Edit
              </a> &nbsp;&nbsp;
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => {
                  confirm(record)
                }}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          ),
        },
      ];

      const confirm = (record:SingleUserType) => {
        const id = record.id;
        dispatch({
          type:'users/delete',
          payload: id
        })
      }

      const editHandle = (record:SingleUserType) => {
        setModalVisible(true);
        setRecord(record)
      }

      const closeHandle = () =>{
        setModalVisible(false)
      }

    const onFinish = (values:FormValues) => {
        let id = 0;
        if(record) {
          id = record.id
        }
        if(id) {
          console.log('edit');
          
          dispatch({
            type: 'users/edit',
            payload: {
              id,
              values
            }
          });
        }else {
          dispatch({
            type: 'users/add',
            payload: {
              values
            }
          });
        }
        
        setModalVisible(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const addHandler = () => {
      setModalVisible(true)
      setRecord(undefined)
      console.log('add edit');
      
    }

    // const requestHandler = async ({pageSize, current}) => {
    //   console.log(pageSize, current);
    //   const users = await getRemoteList({
    //     page: current,
    //     per_page: pageSize,
    //   });
    //   console.log(users);
      
    //   if(users) {
    //     return {
    //       data: users.data,
    //       success: true,
    //       total:users.meta.total,
    //     };
    //   }else{
    //     return {
    //       data:[],
    //     }
    //   }
    // }

    const paginationHandle = (page, pageSize) => {
      console.log(page,pageSize);
      
    }

    const reloadHandler = () => {
      ref.current.reload();
    }

    return (
      <div className="list-table">
        <Button 
          type='primary'
          onClick={addHandler}
        >
          Add
        </Button>
        <Button 
          onClick={reloadHandler}
        >
          Reload
        </Button>
        <ProTable 
          columns={columns} 
          dataSource={users.data} 
          rowKey='id' 
          loading={userListLoading}
         //  request={requestHandler}
          search={false}
          actionRef={ref}
          pagination={false}
        />
        <Pagination
          className='list-page'
          total={9}
          showSizeChanger
          showQuickJumper
          showTotal={total => `Total ${total} items`}
        />
        <UserModal 
          visible={modalVisible}
          closeHandler={closeHandle}
          record={record}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
        </UserModal>
      </div>
    )
}

const mapStateToProps = ({users , loading}:{users:UserState, loading:Loading}) => {
  console.log(users.meta.total);
  
    return {
        users,
        userListLoading: loading.models.users,
    }
}

export  default  connect(mapStateToProps)(UserListPage);
// export default connect(({ users }) => ({
//     users,
//   }))(index);