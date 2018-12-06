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
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password2" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
                <el-input type="password2" v-model="ruleForm2.tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item align="center" id="btn">
                <el-button type="primary" @click="submitForm()">注册</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="bottom-bar">
            <p>吃了么点餐系统隶属于格莱科技旗下产品，最终解释权属于本公司。<br>我有账号<a href="javascript:void(0)" @click="jumpLogin">点击登录</a></p>
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
        }else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
       var checkTel = (rule, value, callback) => {
         let pattern = /^1[34578]\d{9}$/;
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        if (!pattern.test(value)) {
          return callback(new Error('手机号码格式不正确'));
        }
      };
      return {
        ruleForm2: {
          username: '',
          pass: '',
          checkPass:'',
          tel:''
        },
        rules2: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          tel: [
            { validator: checkTel, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        if (this.ruleForm2.username=="" || this.ruleForm2.pass=="") {
            this.$message('信息不完整');
        } else {
/*//      ajax登录请求
            axios.post('/reg',{
              username:this.ruleForm2.username,
              password:this.ruleForm2.pass,
              usertel:this.ruleForm2.tel
            })
            .then((response)=>{
              this.$message(response.data.errMsg)
              if (response.data.errCode!=0) {
                  this.$message.error(response.data.errMsg)
              } else {
                this.$message(response.data.errMsg)
                this.$router.push('/')
              }
            })
            .catch((error)=>{
                this.$message.error("网络问题，请稍候连接。")
                console.log(error.data)
            })*/
            
            //模拟数据
            //      ajax登录请求
              this.$message("注册成功")
              this.$router.push('/')
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      jumpLogin(){
          this.$router.push('/')
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