// 引入模块a对象拆分出来的文件，并导出store
import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
