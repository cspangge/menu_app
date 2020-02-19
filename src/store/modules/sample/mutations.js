// 存放同步读取/修改state的方法
import * as types from './mutation-types';

const mutations = {
  [types.UPDATE_SAMPLE] (state, payload) {
    console.log('Running mutation.');
    state.sample = payload.sample;
  },
  [types.UPDATE_SAMPLE_DATA] (state, payload) {
    console.log('Sample Data mutation');
    state.sampleData = payload.sampleData;
  },
  [types.UPDATE_YIQING_DATA] (state, payload) {
    state.yiqingData = payload.yiqingData;
  }
};

export default mutations;
