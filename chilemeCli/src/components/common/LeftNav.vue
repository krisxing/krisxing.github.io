<template>
    <div class="left-bar">
        <ul>
          <li><a href="#"><i class="icon iconfont icon-rechargefill"></i>收银</a></li>
          <li><a href="#"><i class="icon iconfont icon-huiyuan"></i>会员</a></li>
          <li><a href="#"><i class="icon iconfont icon-navicon-kczb"></i>库存</a></li>
          <li><a href="#"><i class="icon iconfont icon-jiaohuan"></i>换班</a></li>
          <li><a href="#"><i class="icon iconfont icon-biao"></i>报表</a></li>
          <li><a href="#"><i class="icon iconfont icon-ceshifuzhu"></i>辅助</a></li>
          <li><a href="javascript:void(0)" @click="loginOut"><i class="icon iconfont icon-tuichu-"></i>退出</a></li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'LeftNav',
  methods: {
      loginOut(){
        localStorage.removeItem('tokenID')
        this.$message('退出成功!');
        this.$router.push('/')
      }
  }
}
</script>
<style scoped>
.left-bar{
   width: 80px;
   height: 100%;
   background: #429bff;
   text-align:center;
   float: left;
   position: relative;
   z-index: 1000;
 }
.left-bar a{
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
.left-bar li{
  border-bottom: 1px solid #7ac3c6;
  padding-bottom: 10px;
}
.left-bar li:first-child{
  background: #dd375f;
}
.left-bar i{
  display:block;
  font-size: 28px;
}
</style>

