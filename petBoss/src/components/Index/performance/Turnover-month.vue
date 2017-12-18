<template>
  <div class="header">
    <div class="header-2">
      <span class="font">营业额月报<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 筛选 -->
    <div class="screen">
      <span class="titles">筛选</span>
      <div class="screen-condition">
        <select class="select-choice" v-model="dataOne" @change="getMonth()">
          <option v-for="item in yearss" :value=item.Year>{{item.Year}}</option>
        </select>
      </div>
      <!-- select月选择器-->
      <div class="screen-condition">
        <select class="select-choice" v-model="dataTwo" @change="getDatas()">
          <option v-for="item in Monthss" :value=item.Month>{{item.Month}}</option>
        </select>
      </div>
    </div>
    <!-- 折线图表 -->
    <div class="lines">
      <span>{{month}}月营业额</span>
      <div id="main" style="width: 100%;height: 2.72rem">
      </div>
    </div>
    <!-- 饼型图表-->
    <div class="turnover">
      <!-- 内容页头 -->
      <div class="head-msg">
        <span class="date">营业总额</span>
        <div style="display: flex">
          <span class="Percentage">较前月&nbsp;:&nbsp; <span class="colors">{{datas.previousmonth}}</span></span>
          <span class="all-money">总计&nbsp;:&nbsp;&yen;&nbsp;<span class="colors-two">{{datas.total}}</span><i></i></span>
        </div>
      </div>
      <!-- 图表内容 -->
      <div id="maintwo" style="width: 100%;height: 4.6rem"></div>
    </div>
    <!-- 详细数据 -->
    <div class="data-detail">
      <h1>详细数据</h1>
      <table>
        <thead class="data-head">
        <tr>
          <td class="left">收入方式</td>
          <td>收入金额</td>
          <td class="rights">占比</td>
        </tr>
        </thead>
        <tbody class="data-body">
        <tr v-for="item in datas.detailed">
          <td class="left">{{item.pay_method}}</td>
          <td class="center">{{item.pay_price}}</td>
          <td class="right">{{item.proportion}}</td>
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
      name:'header',
      data(){
        return{
          increase: false,
          timeschoice: false,
          values: '',
          yearss:[],
          Monthss:[],
          val: '',
          dataOne:'',
          dataTwo:'',
          datas:[],
          up: [
            {
              names: '2017'
            },
            {
              names: '2016'
            },
            {
              names: '2015'
            }
          ],
          times: [
            {
              years: '6月'
            },
            {
              years: '7月'
            },
            {
              years: '8月'
            }
          ],
          years:'',
          months:''
        }
      },
      created(){
        this.getTurnoverMonth()
      },
      mounted(){
         this.myChart = echarts.init(document.getElementById('main'));
        let option = {
          grid: {
            left: '0',
            right: '5%',
            bottom: '7.5%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              axisTick: {
                alignWithLabel: true,
                show:false
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'red',
                  type:'dashed'
                }
              },
              axisLabel:{
                fontSize:'20%',
                padding:[6,0,0,0]
              },
              data : []
            }
          ],
          yAxis : [
            {
              show:false,
              type : 'value',
            }
          ],
          series : [
            {
              name:'营业额',
              type:'line',
              label: {normal: {
                show: true,
                position:'top',
                distance:10,
                fontSize:'20%'
              }},
              stack: '总金额',

              data:[]
            }
          ],
        };
        this.myChart.setOption(option);
        window.onresize = this.myChart.resize;
        this.myCharts = echarts.init(document.getElementById('maintwo'));
        let options = {
          series: [
            {
              name: '营业额',
              type: 'pie',
              radius: ['25%', '60%'],
              label: {normal: {
                show: true,
                position:'top',
                fontSize:'20%'
              }},
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    formatter:"{c}\n {b}"
                },
                  labelLine:{
                    show:true

                  }
                }
              },
              data: [
                {
                  value: [],
                  name: [],
                  itemStyle: {
                    normal: {
                      color: '#4a505f'
                    }
                  }
                },
                {
                  value: [],
                  name: [],
                  itemStyle: {
                    normal: {
                      color: '#ffc657'
                    }
                  }
                },
                {
                  value: [],
                  name: [],
                  itemStyle: {
                    normal: {
                      color: '#55c1be'
                    }
                  }
                },
              ]
            }
          ]
        };
        this.myCharts.setOption(options);
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
//        获取营业额月报表
        getTurnoverMonth(){
          let timess = new Date()
          let year = timess.getFullYear();
          let month = timess.getMonth()+1;
          if(month < 10){
            month = "0"+month;
          }
          this.month = month;
          console.log(month)
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
            url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/TurnoverMonth.php',
            data:{
              "store_id":localStorage.getItem('storeId'),
              "system_id":85916832,
              "timestamp":time,
              "sign":signValue,
              "data":{
                month:month,
                year:year
              }
            }
          }).then( res =>{
            console.log(res);
            if(res.data.err_code === "0000"){
              this.datas = res.data.data;
              this.yearss = res.data.yearres;
              let aaa = [];
              let bbb = [];
              let ccc = [];
              let ddd = [];
              res.data.data.detailed.forEach((item,index,array) =>{
                aaa.push(item.pay_method);
                bbb.push(item.pay_price);
              });
              res.data.data.price.forEach((item,index,array) =>{
                ccc.push(item.date);
                ddd.push(parseInt(item.price));
              })
              this.myChart.setOption({
                xAxis : [
                  {
                    type : 'category',
                    boundaryGap : false,
                    axisTick: {
                      alignWithLabel: true,
                      show:false
                    },
                    axisLine: {
                      onZero: false,
                      lineStyle: {
                        color: 'red',
                        type:'dashed'
                      }
                    },
                    axisLabel:{
                      fontSize:'20%',
                      padding:[6,0,0,0]
                    },
                    data : ccc
                  }
                ],
                series : [
                  {
                    name:'营业额',
                    type:'line',
                    label: {normal: {
                      show: true,
                      position:'top',
                      distance:10,
                      fontSize:'20%'
                    }},
                    stack: '总金额',

                    data:ddd
                  }
                ],
              });
              this.myCharts.setOption({
                series: [
                  {

                    data: [
                      {
                        value: bbb[0],
                        name: aaa[0],
                        itemStyle: {
                          normal: {
                            color: '#4a505f'
                          }
                        }
                      },
                      {
                        value: bbb[1],
                        name: aaa[1],
                        itemStyle: {
                          normal: {
                            color: '#ffc657'
                          }
                        }
                      },
                      {
                        value: bbb[2],
                        name: aaa[2],
                        itemStyle: {
                          normal: {
                            color: '#55c1be'
                          }
                        }
                      },
                    ]
                  }
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
//        更改年份获取月份
        getMonth(){
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
            url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/ChangeMonth.php',
            data:{
              "store_id":localStorage.getItem('storeId'),
              "system_id":85916832,
              "timestamp":time,
              "sign":signValue,
              "data":{
                year:this.dataOne
              }
            }
          }).then( res =>{
            console.log(res);
            if(res.data.err_code === "0000"){
              this.Monthss = res.data.year;
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
//        获取到月份更改数据
        getDatas(){
          let timess = new Date()
          let year = timess.getFullYear();
          let month = timess.getMonth()+1;
          if(month < 10){
            month = "0"+month;
          }
          this.month = month;
          console.log(month)
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
            url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/TurnoverMonth.php',
            data:{
              "store_id":localStorage.getItem('storeId'),
              "system_id":85916832,
              "timestamp":time,
              "sign":signValue,
              "data":{
                month:this.dataTwo,
                year:this.dataOne
              }
            }
          }).then( res =>{
            console.log(res);
            if(res.data.err_code === "0000"){
              this.datas = res.data.data;
              this.yearss = res.data.yearres;
              let aaa = [];
              let bbb = [];
              let ccc = [];
              let ddd = [];
              res.data.data.detailed.forEach((item,index,array) =>{
                aaa.push(item.pay_method);
                bbb.push(item.pay_price);
              });
              res.data.data.price.forEach((item,index,array) =>{
                ccc.push(item.date);
                ddd.push(parseInt(item.price));
              })
              this.myChart.setOption({
                xAxis : [
                  {
                    type : 'category',
                    boundaryGap : false,
                    axisTick: {
                      alignWithLabel: true,
                      show:false
                    },
                    axisLine: {
                      onZero: false,
                      lineStyle: {
                        color: 'red',
                        type:'dashed'
                      }
                    },
                    axisLabel:{
                      fontSize:'20%',
                      padding:[6,0,0,0]
                    },
                    data : ccc
                  }
                ],
                series : [
                  {
                    name:'营业额',
                    type:'line',
                    label: {normal: {
                      show: true,
                      position:'top',
                      distance:10,
                      fontSize:'20%'
                    }},
                    stack: '总金额',

                    data:ddd
                  }
                ],
              });
              this.myCharts.setOption({
                series: [
                  {

                    data: [
                      {
                        value: bbb[0],
                        name: aaa[0],
                        itemStyle: {
                          normal: {
                            color: '#4a505f'
                          }
                        }
                      },
                      {
                        value: bbb[1],
                        name: aaa[1],
                        itemStyle: {
                          normal: {
                            color: '#ffc657'
                          }
                        }
                      },
                      {
                        value: bbb[2],
                        name: aaa[2],
                        itemStyle: {
                          normal: {
                            color: '#55c1be'
                          }
                        }
                      },
                    ]
                  }
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
    margin-top: 0.16rem;
  }

  .select-choice {
    display: inline-block;
    background-color: #F0F0F0;
    width: 2.1rem;
    height: 0.72rem;
    border-radius: 8px;
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
    background-size: 60%;
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
  .lines{
    height: 4.0rem;
    background-color: #ffffff;
    margin-top: 0.21rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .lines span {
    display: inline-block;
    width: 100%;
    height: 0.6rem;
    font-size: 0.26rem;
    color: #666;
    line-height: 0.6rem;
  }
  .turnover{
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.22rem;
  }
  .head-msg {
    display: flex;
    justify-content: space-between;
    height: 0.92rem;
    border-bottom: 1px solid #e8e8e8;
    padding-left: 0.3rem;
  }

  .date, .Percentage, .all-money {
    line-height: 0.92rem;
  }

  .date {
    font-size: 0.3rem;
    color: #333;
    font-weight: bold;
    text-align: left;
  }

  .Percentage, .all-money {
    /*width: 30%;*/
    font-size: 0.28rem;
    color: #666;
  }

  .colors {
    color: #2db62d;
    font-weight: bold;
    font-size: 0.26rem;
  }

  .colors-two {
    color: #333;
    font-size: 0.26rem;
    font-weight: bold;
  }
  .all-money i{
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png")50% 50% no-repeat;
    vertical-align: sub;
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
    padding-right: 0.26rem;
    text-align: right;
    color: #666;
  }

  .rights {
    padding-right: 0.3rem;
    text-align: right;
  }
</style>
