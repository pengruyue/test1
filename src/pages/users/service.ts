import request, { extend } from 'umi-request';
import {message} from 'antd';
import {SingleUserType,FormValues} from './data'

// 错误处理
const errorHandler = function(error:any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if(error.response.status > 400){
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    message.error('Network error')
  }

  // throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async ({page,per_page}) => {
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}`, {
        method: 'get',
      })
        .then(function(response) {
          return response
        })
        .catch(function(error) {
          return false
        });

}

export const editRecord = async ({id,values}: {id:number; values:FormValues}) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
      method: 'put',
      data:values,
    })
    .then(function(response) {
      return true
    })
    .catch(function(error) {
      return false
    });

}

export const deleteRecord = async (id:number) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
      method: 'delete',
    })
    .then(function(response) {
      return true
    })
    .catch(function(error) {
      return false
    });

}

export const addRecord = async ({values}:{values:FormValues}) => {
  console.log("addRecord"+values);
  
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/`, {
      method: 'post',
      data:values
    })
    .then(function(response) {
      return true
    })
    .catch(function(error) {
      return false
    });

}