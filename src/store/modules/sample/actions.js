// 存放异步读取/修改state的方法
import * as types from './mutation-types';
import { getSampleData, getYiQingData } from '../../../api/get/getSampleData';

const actions = {
  [types.UPDATE_SAMPLE_ACTION] ({ commit }) {
    setTimeout(() => {
      console.log('Running action.');
      commit(types.UPDATE_SAMPLE, { sample: 10 });
    }, 3000);
  },
  [types.UPDATE_SAMPLE_DATA_ACTION] ({ commit }) {
    getSampleData().then(response => {
      console.log(response);
      commit(types.UPDATE_SAMPLE_DATA, { sampleData: response.data });
    });
  },
  [types.UPDATE_YIQING_DATA_ACTION] ({ commit }) {
    getYiQingData().then(response => {
      commit(types.UPDATE_YIQING_DATA, { yiqingData: response.data });
    });
  }
};

export default actions;
