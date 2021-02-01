import { useCallback } from 'react';
import {Reducer, Effect, Subscription} from 'umi';
import {getRemoteList, editRecord, deleteRecord, addRecord} from './service';
import {message} from 'antd';
import {SingleUserType} from './data'


export interface UserState {
  data:SingleUserType[],
  meta: {
    total: number,
    per_page: number;
    page: number;
  }
}

interface UserModelType {
  namespace:'users',
  state : UserState,
  reducers: {
    getList:Reducer
  },
  effects: {
    getRemote: Effect;
    edit:Effect;
    add:Effect;
    delete:Effect;
  },
  subscriptions: {
    setup: Subscription
  }
}

const UserModel: UserModelType = {
  namespace:'users',
  state: {
    data: [],
    meta: {
      total:1,
      per_page:5,
      page:1
    }
  },
  reducers: {
    getList(state, {payload}) {
      console.log('reducers here');
      return payload;
    }
  },
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *edit({payload:{id,values}}, {put, call,select}) {
      const data = yield call(editRecord, {id,values})
      if(data) {
        message.success('Edit success')
        const {page,per_page} = yield select(state => state.users.meta);
        yield put ({
          type:'getRemote',
          payload: {
            page,
            per_page
          }
        })
      }else {
        message.error('Edit error')
      }
    },
    *delete({payload}, {put, call, select}) {
      
      const data = yield call(deleteRecord, payload)
      if(data) {
        message.success('Delete success');
        const {page,per_page} = yield select(state => state.users.meta);
        yield put ({
          type:'getRemote',
          payload: {
            page,
            per_page
          }
        })
      }else {
        message.error('Delete error')
      }
    },
    *add({payload:{values}}, {put, call,select}) {
      console.log("addpayload" + {values});
      const data = yield call(addRecord, {values})
      if(data) {
        message.success('Add success');
        const {page,per_page} = yield select(state => state.users.meta);
        yield put ({
          type:'getRemote',
          payload: {
            page,
            per_page
          }
        })
      }else {
        message.error('Add error')
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log('subscription here');
      history.listen(({pathname}) => {
        if(pathname === '/users') {
          dispatch ({
            type:'getRemote',
            payload: {
              page:1,
              per_page:5,
            }
          })
        }
      })
      
    }
  }
};

export default UserModel;
