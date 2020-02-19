<template>
  <div id="app" style="text-align: center; position:relative;">
    <div style="width: 990px; position:absolute; left: 50%; transform: translateX(-50%)">
      <el-table
        :data="displayData"
        style="width: 990px; text-align: center;"
        :default-sort="{prop: 'confirmedCount', order: 'descending'}"
        v-if="readyToDisplay"
      >
        <el-table-column
          prop="provinceName"
          label="省份"
          sortable
          width="165"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="城市"
          width="165"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @input="doSearch"
              @clear="doClear"
              placeholder="城市"
              clearable
              width="180"
              v-if="readyToDisplay"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="confirmedCount"
          label="确诊病例人数"
          sortable
          width="165"
          align="center">
        </el-table-column>
        <el-table-column
          prop="suspectedCount"
          label="疑似病例人数"
          sortable
          width="165"
          align="center">
        </el-table-column>
        <el-table-column
          prop="curedCount"
          label="治愈人数"
          sortable
          width="165"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deadCount"
          label="死亡人数"
          sortable
          width="165"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="recordsCount"
        v-if='showFooter'
        style="margin-top: 5%"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// import { demo } from './api/get/getSampleData';

export default {
  data () {
    return {
      counter: 0,
      readyToDisplay: false,
      currentPage: 1,
      displayData: [],
      pageSizes: [10, 15, 25, 35],
      pageSize: 10,
      search: '',
      showFooter: true
    };
  },
  computed: {
    ...mapState('sample', {
      sample: state => state.sample,
      sampleData: state => state.sampleData,
      yiqingData: state => state.yiqingData
    }),
    recordsCount () {
      return this.yiqingData.length;
    },
    ...mapGetters('sample', [
      'getYiQingData'
    ])
  },
  methods: {
    ...mapMutations('sample', [
      'updateSample'
    ]),
    ...mapActions('sample', [
      'updateSampleAction',
      'updateSampleDataAction',
      'updateYiQingDataAction'
    ]),
    handleSizeChange (pageSize) {
      // console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      this.currentChangePage();
    },
    currentChangePage () {
      const begin = (this.currentPage - 1) * this.pageSize;
      const end = begin + this.pageSize;
      this.displayData = [];
      for (let i = begin; i < end; i++) {
        this.displayData.push(this.yiqingData[i]);
      }
    },
    doSearch () {
      const tempData = this.yiqingData;
      const arr = tempData.filter(elem => elem.cityName === this.search)[0];
      if (tempData.filter(elem => elem.cityName === this.search).length === 0) {
        this.currentChangePage();
        this.showFooter = true;
      } else {
        this.displayData = [];
        this.displayData.push(arr);
        this.showFooter = false;
      }
    },
    doClear () {
      this.currentChangePage();
      this.showFooter = true;
    }
  },
  mounted: function () {
    // this.updateSampleAction();
    // setTimeout(() => {
    //   console.log(this.sample);
    //   this.updateSampleDataAction();
    // }, 3000);
    // setInterval(() => {
    //   this.updateSampleDataAction();
    //   console.log('Update: ' + this.counter);
    //   this.counter++;
    // }, 5000);
    this.updateYiQingDataAction();
    setTimeout(() => {
      // console.log(this.yiqingData);
      for (let i = 0; i < this.pageSizes[0]; i++) {
        this.displayData.push(this.yiqingData[i]);
      }
      this.pageSizes.push(this.yiqingData.length);
      this.readyToDisplay = true;
    }, 500);
  },
  created: () => {
    // demo();
  }
};

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    color: #2c3e50;
  }
</style>
