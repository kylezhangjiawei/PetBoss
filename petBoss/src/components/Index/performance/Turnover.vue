              <template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">营业额日报<i class="back" @click="goback()"></i> <span class="monthly"
                                                                           @click="goto()">月报</span></span>
    </div>
    <!-- 选择项 -->
    <div class="time-choiceTT">
      <div>
        <input type="date" placeholder="请选择" v-model="timeOne">
        <span>&nbsp;&minus;&nbsp;</span>
        <input type="date" placeholder="请选择" v-model="timeTwo">
        <button type="button" @click="OjbK()">确定</button>
      </div>
    </div>
    <!-- 营业结算内容-->
    <div class="accounts">
      <div class="container" v-for="(item,index) in datas">
        <!-- 内容页头 -->
        <div class="head-msg">
          <span class="date">{{item.today_add_date1}}</span>
          <div style="display: flex">
            <span class="Percentage">较前日&nbsp;:&nbsp; <span class="colors">{{item.change}}</span></span>
            <span class="all-money">总计&nbsp;:&nbsp;&yen;&nbsp;<span class="colors-two">{{item.today_actual}}元</span></span>
          </div>
        </div>
        <!-- 内容区域 -->
        <div class="list-container" @click="light(indexs,items)"
             :class="{'on':flag === index}" v-for="(items,indexs) in item.order_info">
          <div class="peoplist">
            <span class="number"><i></i></span>
            <div class="msg">
              <dt>{{items.pay_method}}</dt>
              <dd>{{items.time}}</dd>
            </div>
            <span class="money">&yen;&nbsp;{{items.actual_price}}<i></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import getData from '../../../assets/Data'
  import { Toast } from 'mint-ui';
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        flag: -1,
        datas:[],
        timeOne:'',
        timeTwo:''

      }
    },
    created(){
      this.getTurnover()
    },
    methods: {
//      点击获取报表详情
      light(index, item) {
        this.flag = index;
//          this.names = item.name;
          console.log(item,index);
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
          url:'https://api.yongdaoyun.com/special/pet/MemberShipGrowth/ReportDetails.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":{
              transaction_id:item.transaction_id
            }
          }
        }).then( res =>{
          console.log(res);
         if (res.data.err_code === "0000"){
           this.$router.push({path:'/Performancehtml/Members/Turnover/TurnoverDetail',query:{plan:res.data.data}})
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
      goback() {
        this.$router.go(-1)
      },
      goto() {
        this.$router.push({path: '/Performancehtml/Members/Turnover/TurnoverMonth'});
      },
//      获取营业额日报页面数据接口
      getTurnover(){
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
          url:'https://api.yongdaoyun.com/special/pet/boss/boss_turnover_day.php',
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
        }).catch( err =>{
          console.log(err)
        })
      },
//      查询按钮
      OjbK(){
        console.log(this.timeOne);
        console.log(this.timeTwo);
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
          url:'https://api.yongdaoyun.com/special/pet/boss/boss_turnover_day.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":{
              DateType:2,
              starttime:this.timeOne,
              endtime:this.timeTwo
            }
          }
        }).then( res =>{
          console.log(res);
          this.datas = res.data.data;
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
    overflow: auto;
  }

  .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
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
    left: 5%;
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

  .monthly {
    position: absolute;
    top: 20%;
    right: 5%;
  }

  .time-choiceTT {
    background-color: #ffffff;
    padding-bottom: 0.25rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    margin-top: 1.0rem;
  }

  .time-choiceTT div{
    display: flex;
    justify-content: center;
  }

  .time-choiceTT input {
    width: 2.3rem;
    height: 0.72rem;
    font-size: 0.28rem;
    color: #666;
    padding-left: 0.2rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 8px;
    margin-top: 0.26rem;
    outline: none;
  }

  .time-choiceTT span {
    color: #4a505f;
    font-size: 0.16rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 0.2rem;
  }

  .time-choiceTT button {
    width: 1.73rem;
    height: 0.72rem;
    font-size: 0.28rem;
    color: #fff;
    padding-left: 0.2rem;
    background-color: #4a505f;
    border: none;
    border-radius: 8px;
    margin-left: 0.3rem;
    outline: none;
    margin-top: 0.26rem;
  }

  .accounts {
    margin-top: 2.47rem;
  }

  .container {
    margin-top: 0.21rem;
    background-color: #ffffff;
  }

  .head-msg {
    display: flex;
    justify-content: space-between;
    height: 0.92rem;
    border-bottom: 1px solid #e8e8e8;
    margin-left: 0.3rem;
  }

  .date, .Percentage, .all-money {
    line-height: 0.92rem;
  }

  .date {
    font-size: 0.3rem;
    color: #999;
    font-weight: bold;
    /*width: 40%;*/
    text-align: left;
  }

  .Percentage, .all-money {
    /*width: 30%;*/
    font-size: 0.28rem;
    color: #666;
    padding-right: 0.15rem;
  }

  .colors {
    color: #f23939;
    font-weight: bold;
  }

  .colors-two {
    color: #333;
    font-size: 0.3rem;
  }

  .list-container {
    height: 1.3rem;
    background-color: #ffffff;
    text-align: left;
  }

  .list-container div, .list-container span {
    display: inline-block;
  }

  .peoplist {
    width: 96%;
    height: 100%;
    border-bottom: 1px solid #e8e8e8;
    margin-left: 0.3rem;
  }

  .list-container div dt {
    font-size: 0.3rem;
    color: #333;
    margin-top: 0.25rem;
    margin-bottom: 0.1rem;
  }

  .list-container div dd {
    font-size: 0.24rem;
    color: #999;
    margin: 0;
  }

  .number {
    vertical-align: top;
    display: inline-block;
  }

  .msg {
    width: 25%;
  }

  .number i {
    display: inline-block;
    width: 0.58rem;
    height: 0.58rem;
    background: url("../../../../static/img/zhuanru.png") 50% 50% no-repeat;
    background-size: cover;
  }

  .money {
    font-size: 0.34rem;
    color: #ff6633;
    vertical-align: top;
    margin-top: 0.48rem;
    width: 50%;
    text-align: right;
    display: inline-block;
  }

  .money i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
    vertical-align: middle;
    background-size: cover;
  }

  .on {
    background-color: #e8e8e8;
  }
</style>
