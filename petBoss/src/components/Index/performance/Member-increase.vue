<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">会员增速报表<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 筛选 -->
    <div class="screen">
      <span class="titles">筛选</span>
      <!-- 月份儿，季度 -->
      <div class="screen-condition">
        <select class="select-choice" v-model="dataOne" @change="changeit()">
          <option v-for="item in up" :value=item.type>{{item.names}}</option>
        </select>
      </div>
      <!-- 年份儿-->
      <div class="screen-condition">
        <select class="select-choice" v-model="dataTwo" @change="changeit()">
          <option v-for="item in times" :value=item.Year>{{item.Year}}</option>
        </select>
      </div>
    </div>
    <!-- 会员增速报表 -->
    <div class="statement">
      <div id="mains" style="width: 100%;height: 5.0rem"></div>
    </div>
    <!-- 详细数据 -->
    <div class="data-detail">
      <h1>详细数据</h1>
      <table>
        <thead class="data-head">
        <tr>
          <td class="left">月份</td>
          <td>人数</td>
          <td class="rights">较前月</td>
        </tr>
        </thead>
        <tbody class="data-body">
        <tr v-for="item in datas">
          <td class="left">{{item.date}}</td>
          <td class="center">{{item.num}}</td>
          <td class="right">{{item.percentage}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import getData from '../../../assets/Data'
  import { Toast } from 'mint-ui';
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        increase: false,
        timeschoice: false,
        datas:[],
        year:'',
        values: '',
        val: '',
        dataOne:'',
        dataTwo:'',
        up: [
          {
            names: '月增长',
            type:1
          },
          {
            names: '季增长',
            type:2
          },
          {
            names: '年增长',
            type:3
          }
        ],
        times: [],
      }
    },
    created(){
      let timess = new Date()
      this.year = timess.getFullYear();
      this.getMemberIncrease();
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('mains'));
      let option = {
        title: {
          text: '2017年会员增速报表',
          textStyle: {
            fontSize: '30%',
            color: '#666'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#87D5D2'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: [],
            type: 'line',
            label: {normal: {show: true}},
            stack: '总量',
            areaStyle: {normal: {}},
            data: [],
            itemStyle: {
              normal: {
                color: '#87D5D2'
              }
            }
          },
        ]
      };
      this.myChart.setOption(option);
      window.onresize = this.myChart.resize;
    },
    methods: {
      selectClick(item) {
        this.values = item.names;
        this.increase = false;
      },
      selectClickTwo(items) {
        this.val = items.years;
        this.timeschoice = false;
      },
      selectChoice() {
        if (this.increase == false) {
          this.increase = true;
        } else {
          this.increase = false;
        }
      },
      selectChoiceTwo() {
        if (this.timeschoice == false) {
          this.timeschoice = true;
        } else {
          this.timeschoice = false;
        }
      },
      goback() {
        this.$router.go(-1)
      },
//      获取会员增速报表接口
      getMemberIncrease(){
        let time = Date.parse(new Date()).toString().substring(0,10);
        let objs = {
          system_id:85916832,
          timestamp:time,
          store_id:localStorage.getItem('storeId')
        };
        let sortStr=getData(objs);
        let strings="";
        let key = localStorage.getItem('Key');
        for(let i in sortStr){
          strings+=i+"="+sortStr[i] + "&"
        }
        //拼接秘钥
        strings+="key"+"="+key;
        //加密后的字符串
        let signValue = md5(strings).toUpperCase();
        this.$http({
          method:'post',
          url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/MemberShipGrowth.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":{
              Classification:1,
              Year:this.year
            }
          }
        }).then( res =>{
          console.log(res);
          if(res.data.err_code === "0000"){
            this.datas = res.data.data;
            this.times = res.data.years;
            let aaa = [];
            let bbb = [];
            res.data.data.forEach((item,index,array) =>{
              aaa.push(parseInt(item.num))
              bbb.push(item.date)
            })
            console.log(aaa)
            console.log(bbb)
//          this.myChart.hideLoading();
            this.myChart.setOption({
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: bbb
                }
              ],
              series: [
                {
                  name: this.year+"年会员增速报表",
                  type: 'line',
                  label: {normal: {show: true}},
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data: aaa,
                  itemStyle: {
                    normal: {
                      color: '#87D5D2'
                    }
                  }
                },
              ]
            })
          }else {
            Toast({
              message: '获取数据失败..',
              duration: 2000,
              className:'ok'
            })
          }

        }).catch( err =>{
          console.log(err)
        })
      },
      changeit(){
        if(this.dataOne != '' && this.dataTwo != ''){
          let time = Date.parse(new Date()).toString().substring(0,10);
          let objs = {
            system_id:85916832,
            timestamp:time,
            store_id:localStorage.getItem('storeId')
          };
          let sortStr=getData(objs);
          let strings="";
          let key = localStorage.getItem('Key');
          for(let i in sortStr){
            strings+=i+"="+sortStr[i] + "&"
          }
          //拼接秘钥
          strings+="key"+"="+key;
          //加密后的字符串
          let signValue = md5(strings).toUpperCase();
          this.$http({
            method:'post',
            url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/MemberShipGrowth.php',
            data:{
              "store_id":localStorage.getItem('storeId'),
              "system_id":85916832,
              "timestamp":time,
              "sign":signValue,
              "data":{
                Classification:this.dataOne,
                Year:this.dataTwo
              }
            }
          }).then( res =>{
            console.log(res);
            if(res.data.err_code === "0000"){
              this.datas = res.data.data;
              this.times = res.data.years;
              let aaa = [];
              let bbb = [];
              res.data.data.forEach((item,index,array) =>{
                aaa.push(parseInt(item.num))
                bbb.push(item.date)
              })
              console.log(aaa)
              console.log(bbb)
//          this.myChart.hideLoading();
              this.myChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: bbb
                  }
                ],
                series: [
                  {
                    name: this.dataTwo+"年会员增速报表",
                    type: 'line',
                    label: {normal: {show: true}},
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: aaa,
                    itemStyle: {
                      normal: {
                        color: '#87D5D2'
                      }
                    }
                  },
                ]
              })
            }else {
              Toast({
                message: '获取数据失败..',
                duration: 2000,
                className:'ok'
              })
            }

          }).catch( err =>{
            console.log(err)
          })
        }else {
          console.log('其中有个为空了！')
        }

      }
    }
  }
</script>
<style scoped>
  .header {
    height: 100%;
  }
 .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: relative;
  }

  .back {
    display: inline-block;
    width: 0.23rem;
    height: 0.38rem;
    background: url("../../../../static/img/01_033.png") no-repeat;
    vertical-align: top;
    position: absolute;
    top: 30%;
    left: 5%;
    background-size: cover;
  }

  .header-2 span {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .font {
    width: 100%;
    font-size: 0.36rem;
    text-align: center;
    color: #ffffff;
  }
  .screen {
    height: 1.22rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
  }

  .titles {
    font-size: 0.28rem;
    color: #666;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 0.3rem;
    width: 25%;
    text-align: left;
  }

  .screen-condition {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    margin-left: 0.3rem;
    width: 30%;
  }

  .selects {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f0f0f0;
    position: absolute;
    top: 80%;
    left: 0;
    right: -2%;
    font-size: 0.28rem;
    color: #666;
    z-index: 1;
  }

  .selects span {
    margin-top: 0.01rem;
  }

  .select-choice {
    display: inline-block;
    background-color: #F0F0F0;
    width: 2.1rem;
    height: 0.72rem;
/*    border-radius: 8px;*/
    font-size: 0.28rem;
    color: #666;
    line-height: 0.72rem;
    text-align: left;
    padding-left: 0.2rem;
    position: relative;
  }

  .select-choice i {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    background: url("../../../../static/img/paixu.png") no-repeat;
    position: absolute;
    top: 0.31rem;
    right: 0;
    background-size: 50%;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translate(0, -20px);
  }

  .statement {
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.22rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .data-detail {
    background-color: #ffffff;
    margin-top: 0.15rem;
  }

  .data-detail h1 {
    text-align: left;
    font-size: 0.3rem;
    font-weight: bold;
    padding-left: 0.3rem;
  }

  .data-detail table {
    width: 100%;
    border-collapse: collapse;
  }

  .data-head tr td, .data-body tr td {
    border-bottom: 1px solid #e8e8e8;
  }

  .data-head tr, .data-body tr {
    height: 0.6rem;
  }

  .data-head {
    font-size: 0.24rem;
    color: #999;
  }

  .data-body {
    font-size: 0.26rem;
    color: #333;
  }

  .left {
    padding-left: 0.3rem;
    text-align: left;
  }

  .center {
    color: #666;
  }

  .right {
    padding-right: 0.3rem;
    text-align: right;
    color: #f23939;
  }

  .rights {
    padding-right: 0.3rem;
    text-align: right;
  }
</style>
