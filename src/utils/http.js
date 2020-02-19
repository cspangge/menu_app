import request from '@/utils/request';
import qs from 'qs';

export function get (url, params) {
  return new Promise((resolve, reject) => {
    request.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    });
  });
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, qs.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    });
  });
}
