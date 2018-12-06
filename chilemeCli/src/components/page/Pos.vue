<template>
  <div class="pos">
    <left-nav></left-nav>
    <div class="pos-main">
          <el-row>
            <el-col :span='7' class="post-list" id="order-list">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="点餐" name="first">
                        <el-table :data="tableData" border style="width: 100%" >
                            <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                            <el-table-column prop="count" label="数量" align="center" width="50"></el-table-column>
                            <el-table-column prop="price" label="金额"  align="center" width="70"></el-table-column>
                            <el-table-column  label="操作" width="100" fixed="right" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                                <p style="text-align:right;padding-right:10px">数量：{{totalCount}} 总价：{{totalMoney}}元</p>
                        <!-- 三个按钮 -->
                        <div class="btn-group">
                            
                            <el-button type="danger" @click="delAllGoods">清空</el-button>
                            <el-button type="success" @click="checkout">结账</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="订单列表" name="second">
                        <div class="orderlist">
                            <div class="order" v-for="(order,index) in orderList">
                                <div class="order-hd">
                                    订单编号：{{order._id}} 
                                    <span>订单总价：{{order.ordertotal}}元</span>
                                </div>
                                <div class="goods-info">
                                   <table class="order-table" cellpadding="0" cellspacing="0">
                                       <tr>
                                           <td>商品名称</td>
                                           <td>商品数量</td>
                                           <td>商品单价</td>
                                       </tr>
                                       <tr v-for="goodsInfo in orderList">
                                       <!--无后台，所以没有生成订单数据，这里使用商品数据模拟-->
                                           <!--<td>{{goodsInfo.orderName}}</td>
                                           <td>{{goodsInfo.orderNum}}</td>
                                           <td>{{goodsInfo.orderPrice}}</td>-->
                                           <!--模拟数据展示-->
                                           <td>{{goodsInfo.goodsName}}</td>
                                           <td>{{goodsInfo.count}}</td>
                                           <td>{{goodsInfo.price}}</td>
                                       </tr>
                                   </table>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <!--商品展示-->
            <el-col :span="17" id="goods-list">
                <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                        <ul>
                            <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                                <span>{{goods.goodsName}}</span>
                                <span class="o-price">￥{{goods.price}}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods-type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                            <ul class='cookList'>
                                <li v-for="goods in type1Goods"  @click="addOrderList(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="主食">
                            <ul class='cookList'>
                                <li v-for="goods in type2Goods"  @click="addOrderList(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="饮料">
                            <ul class='cookList'>
                                <li v-for="goods in type3Goods"  @click="addOrderList(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
import LeftNav from '@/components/common/LeftNav';
import data from "@/assets/data/goods.json";
export default {
  name: 'Pos',
  components:{
    LeftNav
  },
    data () {
    return {
        activeName: 'first',
        totalMoney:0,
        totalCount:0,
        tableData:[],
        oftenGoods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[],
        orderList:[]
    }
  },
  // 访问授权验证
  beforeRouteEnter: (to, from, next) => {
      var checkTokenID=localStorage.getItem('tokenID')
        if (!checkTokenID) {
            next('/')
        }
        else{
            next()
        }
 },
  mounted:function(){
      var orderHeight=document.body.clientHeight;
      document.getElementById("order-list").style.height=orderHeight+'px';
      this.orderListGet()
  },
  methods: {
      handleClick(tab, event) {
//      console.log(tab, event);
      },
      handleClick(row) {
//      console.log(row);
      },
        //添加订单列表的方法
      addOrderList(goods){
            this.goodsList=[];
            this.totalCount=0; //汇总数量清0
            this.totalMoney=0;
            let isHave=false;
            //判断是否这个商品已经存在于订单列表
            for (let i=0; i<this.tableData.length;i++){
                if(this.tableData[i].goodsId==goods._id){
                    isHave=true; //存在
                }
            }
            //根据isHave的值判断订单列表中是否已经有此商品
            if(isHave){
                //存在就进行数量添加
                 let arr = this.tableData.filter(o =>o.goodsId == goods._id);
                 arr[0].count++;
            }else{
                //不存在就推入数组
                let newGoods={goodsId:goods._id,goodsName:goods.goodsName,price:goods.price,count:goods.count};
                 this.tableData.push(newGoods);
            }
            this. getAllMoney()
      },
      //删除单个商品
      delSingleGoods(goods){
        this.tableData=this.tableData.filter(o => o.goodsId != goods.goodsId);
        this.getAllMoney()
      },
      //汇总数量和金额
        getAllMoney(){
            this.totalCount=0;
            this.totalMoney=0;
            if(this.tableData){
                this.tableData.forEach(element => {
                this.totalCount+=element.count;
                this.totalMoney=this.totalMoney+(element.price*element.count);   
            });
            }  
        },
        //删除所有商品
        delAllGoods() {
            this.tableData = [];
            this.totalCount = 0;
            this.totalMoney = 0;
        },
        checkout() {        
     /*   //  提交订单
            if (this.totalCount!=0) {
            for (let i = 0; i < this.tableData.length; i++) {
                var goodsArr ={orderName:this.tableData[i].goodsName,orderNum:this.tableData[i].count,orderPrice:this.tableData[i].price}
                this.orderList.push(goodsArr) 
            }
            //ajax 提交订单
            this.$http.post('/orderlistAdd',{
                tokenid:localStorage.getItem('tokenID'),
                username:localStorage.getItem('userName'),
                orderList:this.orderList,
                orderTotal:this.totalMoney
            })
            .then(response=>{
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
                this.orderList = [];      
                this.$message({
                        message: '结账成功，欢迎下次光临!',
                        type: 'success'
                    });
                this.orderListGet()
                }) 
            }
            else{
                this.$message.error('未选择商品，下单失败！');
            }*/
            
            
            //模拟数据 实现提交订单功能
            
                  //  提交订单
            if (this.totalCount!=0) {
            for (let i = 0; i < this.tableData.length; i++) {
                var goodsArr ={orderName:this.tableData[i].goodsName,orderNum:this.tableData[i].count,orderPrice:this.tableData[i].price}
                this.orderList.push(goodsArr) 
            }
            //ajax 提交订单
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
                this.orderList = [];      
                this.$message({
                        message: '结账成功，欢迎下次光临!',
                        type: 'success'
                    });
                    console.log(this.orderList);
                this.orderListGet()
            }
            else{
                this.$message.error('未选择商品，下单失败！');
            }  
        },
        //ajax请求获取订单列表
        orderListGet(){       
      /*  // 获取订单列表
            this.$http.post('/orderlistGet',{
                tokenid:localStorage.getItem('tokenID'),
                username:localStorage.getItem('userName')
            })
            .then(response=>{
                this.orderList = response.data.list
                console.log(response)
            })
            .catch(error=>{
                this.$message.error('网络问题，订单列表读取失败！');
            })*/
            
            //模拟请求，直接提供数据
            // 获取订单列表
              this.orderList = data.goods.filter(function(item,index,arr){
              	return item.goodOfften ==1
              })
        }
    },
  created(){
  /*
  //发送ajas请求
      this.$http.get('/goodsofftenlist',{   // 获取常用商品列表
          params:{
            num:10,
            offten:1
          }
      })
      .then(response=>{
         this.oftenGoods=response.data.list;
      })
      .catch(error=>{
          this.$message('网络连接失败,请稍候再试！')
          this.$router.push('/')
      })
        //读取分类商品列表
      this.$http.get('/goodslist')
      .then(response=>{
         this.type1Goods=response.data.list.type1;
         this.type2Goods=response.data.list.type2;
         this.type3Goods=response.data.list.type3; 
      })
      .catch(error=>{
          alert('网络错误，不能访问');
      })
      */
      
      //模拟数据----跳过服务器查询
      //发送ajas请求
     // 获取常用商品列表
         this.oftenGoods=data.goods;
        //读取分类商品列表
         this.type1Goods=data.goods.filter((ele)=>{
         	return ele.goodType == 1
         })
         this.type2Goods=data.goods.filter((ele)=>{
         	return ele.goodType == 2
         })
         this.type3Goods=data.goods.filter((ele)=>{
         	return ele.goodType == 3
         })
     
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
  }
}
</script>
<style scoped>
.pos{
  height: 100%;
}
#order-list{
  width: 400px;
  float: left;
  height: 100%;
  padding: 0 3px;
  box-sizing: border-box
}
.post-list{
    background-color: #fff;
    border-right: 1px solid #ccc;
    height: 100%;
    overflow-y: auto;
}
.btn-group{
    text-align: center;
    padding: 10px 0
}
.title{
    height: 20px;
    border-bottom:1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding:10px;
    margin-bottom: 20px;
}
#goods-list{
  width: calc(100% - 480px);
  float: left;
}
.often-goods-list ul li{
    list-style: none;
    float:left;
    border:1px solid #E5E9F2;
    padding:10px;
    margin:5px;
    background-color:#fff;
    cursor: pointer;
}
.o-price{
    color:#58B7FF; 
}
.goods-type{
    clear: both;
    padding-left: 10px;
    margin-top: 20px;
}
.cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
}
.cookList li span{
    display: block;
    float:left;
    cursor: pointer;
}
.foodImg{
    width: 40%;
}
.foodName{
    font-size: 18px;
    padding-left: 10px;
    color:brown;
}
.foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
}
.orderlist{
    width: 100%;
    background: #fff;
    font-size: 12px;
}
.order{
    border: 1px solid #efefef;
    margin-bottom: 10px
}
.order-hd{
    background: #fbfbfb;
    border-bottom:1px solid #ebebeb;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px
}
.order-hd span{
    float: right;
    color: red;
}
.goods-info{
    padding: 5px
}
.order-table{
    border: 1px solid #ebebeb
}
.order-table tr:first-child{
    font-weight: bold;
    color:#333;
    background: #f8f8d9;
}
.order-table td{
    width: 150px;
    text-align: center;
    line-height: 25px;
}
</style>