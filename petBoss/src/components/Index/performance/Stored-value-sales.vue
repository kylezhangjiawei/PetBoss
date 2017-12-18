<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">储值销售<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 筛选 -->
    <div class="screen">
      <span class="titles">筛选</span>
      <!-- 模拟select-two-->
      <div class="screen-condition">
        <span class="select-choice" @click="selectChoiceTwo()">{{val}}  <i></i></span>
        <transition name="slide-fade" mode="out-in">
          <div class="selects" v-if="timeschoice">
            <span v-for="list in times" @click="selectClickTwo(list)">{{list.years}}</span>
          </div>
        </transition>
      </div>
    </div>
    <!-- 折线图表 -->
    <div class="lines">
      <span>2017储值总额</span>
      <div id="main" style="width: 100%;height: 2.72rem">
      </div>
    </div>
    <!-- 详细数据 -->
    <div class="data-detail">
      <h1>详细数据</h1>
      <table>
        <thead class="data-head">
        <tr>
          <td class="left">月份</td>
          <td>储值销售金额</td>
          <td class="rights">较上月</td>
        </tr>
        </thead>
        <tbody class="data-body">
        <tr v-for="item in datadetail">
          <td class="left">{{item.sex}}</td>
          <td class="center">{{item.num}}</td>
          <td class="right">{{item.proportion}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
    export default {
      name:'header',
      data(){
        return{
          timeschoice: false,
          val: '',
          times: [
            {
              years: 2017
            },
            {
              years: 2016
            },
            {
              years: 2015
            }
          ],
          datadetail: [
          {
            sex: '1月',
            num: '635.3',
            proportion: '+40.84%'
          },
          {
            sex: '2月',
            num: '720',
            proportion: '+46.3%'
          },
          {
            sex: '3月',
            num: '2001.4',
            proportion: '+12.86%'
          }
        ]
        }
      },
      mounted(){
        let myChart = echarts.init(document.getElementById('main'));
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
               show:false,
              },
              axisLabel:{
                fontSize:'20%',
                padding:[6,0,0,0]
              },
              data : ['4月','5月','6月','7月','8月']
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

              data:[28450,32360,21190,22320,31040]
            }
          ],
        };
        myChart.setOption(option);
        window.onresize = myChart.resize;
      },
      methods:{
        goback(){
          this.$router.go(-1)
        },
        selectClickTwo(items) {
          this.val = items.years;
          this.timeschoice = false;
        },
        selectChoiceTwo() {
          if (this.timeschoice == false) {
            this.timeschoice = true;
          } else {
            this.timeschoice = false;
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
    margin-left: 35%;
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
