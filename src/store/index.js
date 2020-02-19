// dispatch去调用action, action去调用mutation, mutation去更改state
// 同时还建议通过getters去获取数据, 不推荐通过$store.state.num方式去直接访问store对象。
// 组装模块并导出store的地方
import Vue from 'vue';
import Vuex from 'vuex';
import sample from './modules/sample';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  strict: debug,
  modules: {
    sample: sample
  },
  plugins: []
});

export default store;
