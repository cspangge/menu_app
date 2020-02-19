// 获取变量的方法
const getters = {
  getSample (state) {
    return state.sample;
  },
  getSampleData (state) {
    return state.sampleData;
  },
  getYiQingData (state) {
    return state.yiqingData;
  }
};

export default getters;
