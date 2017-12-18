<template>
  <div class="header structure">
    <!-- header  -->
    <div class="header-2">
      <span class="font">会员结构<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 性别分布与卡类型分布-->
    <div class="choice-head">
      <mt-navbar class="page-part" v-model="selecteds">
        <mt-tab-item id="1" class="topleftradius">性别分布</mt-tab-item>
        <mt-tab-item id="2" class="toprightradius">卡类型分布</mt-tab-item>
      </mt-navbar>
    </div>
    <!-- 对应图表内容 -->
    <div class="charts">
      <mt-tab-container v-model="selecteds">
        <mt-tab-container-item id="1" class="charts-style">
          <div id="main" style="width: 100%;height: 4.6rem"></div>
          <!--空白条-->
          <div style="background-color: #efefef;height: 0.21rem;"></div>
          <!-- 详细数据 -->
          <div class="data-detail">
            <h1>详细数据</h1>
            <table>
              <thead class="data-head">
              <tr>
                <td class="left">性别</td>
                <td>人数</td>
                <td class="right">占比</td>
              </tr>
              </thead>
              <tbody class="data-body">
              <tr v-for="item in datas.sex">
                <td class="left">{{item.sex}}</td>
                <td>{{item.num}}</td>
                <td class="right">{{item.proportion}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="charts-style">
          <!-- 详细数据 -->
          <div class="data-detail">
            <h1>详细数据</h1>
            <table>
              <thead class="data-head">
              <tr>
                <td class="left">卡类型</td>
                <td>数量</td>
                <td class="right">占比</td>
              </tr>
              </thead>
              <tbody class="data-body">
              <tr v-for="item in datas.cardtype">
                <td class="left">{{item.title}}</td>
                <td>{{item.num}}</td>
                <td class="right">{{item.proportion}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <!-- 公司注册符号与名称-->
    <!-- <p id="footer">&copy;2017用道云 1.0.8</p> -->
  </div>
</template>
<script>
  import echarts from 'echarts'
  import getData from '../../../assets/Data'
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        selecteds: '1',
        datas:''
      }
    },
    created(){
      this.getMemberStructure();

    },
    mounted(){
      this.getText()
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
//      获取会员分布报表接口
      getMemberStructure(){
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
          url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/MemberStructure.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":{

            }
          }
        }).then( res =>{
          console.log(res);
          this.datas = res.data.data;
          let man = parseInt(res.data.data.man);
          let woman = parseInt(res.data.data.woman);
//          this.myChart.hideLoading();
          this.myChart.setOption({
            series:[
              {
                data: [
                  {
                    value: man,
                    name: '男',
                    itemStyle: {
                      normal: {
                        color: '#4a505f'
                      }
                    }
                  },
                  {
                    value: woman,
                    name: '女',
                    itemStyle: {
                      normal: {
                        color: '#ffc657'
                      }
                    }
                  }
                ]
              }
            ]
          })

        }).catch( err =>{
          console.log(err)
        })
      },
//      饼状报表
      getText(){
        this.myChart = echarts.init(document.getElementById('main'));
        let option = {
          series: [
            {
              name: '性别分布',
              type: 'pie',
              radius: ['25%', '60%'],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  fontSize:'20%'
                },
                itemStyle: {
                  normal:{
                    label:{
                      show:true,
                      formatter:"{c}\n{b}"
                    }
                  }
                }
              },
              labelLine: {
                show:true
              },
              data: [
                {
                  value: [],
                  name: '男',
                  itemStyle: {
                    normal: {
                      color: '#4a505f'
                    }
                  }
                },
                {
                  value: [],
                  name: '女',
                  itemStyle: {
                    normal: {
                      color: '#ffc657'
                    }
                  }
                }
              ]
            }
          ]
        };
//        this.myChart.showLoading();
        this.myChart.setOption(option);
        window.onresize = this.myChart.resize;
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
  .choice-head {
    background-color: #ffffff;
    height: 1.24rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .page-part {
    margin-top: 0.21rem;
    border: 1px solid #4a505f;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    border-radius: 10px;
  }

  .topleftradius {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .toprightradius {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .charts {
    margin-top: 0.21rem;
  }

  .data-detail {
    background-color: #ffffff;
    margin-top: 0.21rem;
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

  .right {
    padding-right: 0.3rem;
    text-align: right;
  }

  #footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
<style>
  .structure .mint-tab-item-label {
    font-size: 0.28rem;
  }

  .structure .mint-navbar .mint-tab-item {
    color: #4b5060;
  }

  .structure .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 1px solid #4b5060;
    margin-bottom: -1px;
    background-color: #4a505f;
    color: #ffffff;
  }
  .structure .mint-navbar .mint-tab-item{
    padding: 0.17rem 0;
  }
</style>
