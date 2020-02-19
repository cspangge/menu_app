import { get } from '../../utils/http';

function getSampleData () {
  return get('https://api.coindesk.com/v1/bpi/currentprice.json');
}

function demo () {
  get('http://www.dzyong.top:3005/yiqing/area')
    .then(res => {
      console.log(res);
    });
}

function getYiQingData () {
  return get('http://www.dzyong.top:3005/yiqing/area');
}

export {
  getSampleData,
  demo,
  getYiQingData
};
