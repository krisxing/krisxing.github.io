<template>
  <div class="login">
      <div class="hd">
        <i class="icon iconfont icon-chushimao"></i>
        </div>
      <div class="main">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
             <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item align="center" id="btn">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="bottom-bar">
            <p>吃了么点餐系统隶属于格莱科技旗下产品，最终解释权属于本公司。<br>还没账号请<a href="javascript:void(0)" @click="jumpReg">点击注册</a></p>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
      return {
        ruleForm2: {
          username: '',
          pass: ''
        },
        rules2: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        if (this.ruleForm2.username=="" || this.ruleForm2.pass=="") {
            this.$message.error('信息不完整!');
        } else {
/*        	//发送ajas请求
            axios.post('/login',{
              username:this.ruleForm2.username,
              password:this.ruleForm2.pass
            }).then((response)=>{
              if (response.data.errCode!=0) { //请求成功，未完成登录
                    this.$message.error(response.data.errMsg)
                } else {//请求成功，完成登录
                  this.$message(response.data.errMsg)
                  localStorage.setItem('tokenID',response.data.tokenID)
                  localStorage.setItem('userName',this.ruleForm2.username)
                  this.$router.push('/pos')
                }
            })
            .catch((error)=>{ //请求失败
              this.$message.error("网络问题，请稍候连接。")
              console.log(error)
            })
        }
        */
        //模拟请求----跳过登录验证
            localStorage.setItem('tokenID',"123456")
            localStorage.setItem('userName',"123456")
            this.$router.push('/pos')
        }
        
        
        
        
        
        
        
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      jumpReg(){
          this.$router.push('reg')
      }
    }
  }
</script>
<style scoped>
.login{
    padding-top: 5%;
    width: 430px;
    margin: 0 auto;
}
.login .hd{
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
    padding-left: 45px;
}
.el-form-item__label{
    color: #fff !important;
}
.hd i{
  font-size: 76px;
  color: #f90;
}
.bottom-bar{
    text-align: center;
    color: #8d8d8d;
    font-size: 12px;
    margin-top: 10%;
    line-height: 2;
}
.bottom-bar a{
    color: #808080
}
#btn{
  padding-right: 45px
}
</style>