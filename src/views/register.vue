<template>
  <div class="wrapper">
    <el-row class="top-nav-bg">
      <div class="top-nav">
        <el-col :span="20">
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <!--<el-button>默认按钮</el-button>-->
        </el-col>
      </div>
    </el-row>

    <div class="login-box" >
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <el-input v-model="registerName" placeholder="请输入手机号码" type="text"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <el-input v-model="registerPwd" placeholder="请输入密码" type="password"></el-input>
        </div>
      </el-col>
    </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <el-input v-model="confirmRegisterPwd" placeholder="再次确认您的密码" type="password"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click=postRegisterMessage class="login-btn">注册</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return{
        registerName:'',
        registerPwd:'',
        confirmRegisterPwd:'',
        activeIndex:'1'
      }

    },
    mounted(){
    },
    methods:{
      postRegisterMessage(){
        let thisObj = this;
        if(this.mobileCheck(this.registerName) != true){
            this.errorTip(this.mobileCheck(this.registerName))
            return false
        }else if(this.checkpassword(this.registerPwd) != true){
            this.errorTip(this.checkpassword(this.registerPwd))
          return false
        }

        axios.post("/api/register", {
          userName:this.registerName,
          userPwd:this.registerPwd
        }).then(function (res) {
          console.log(res)
          var status = res.data.status
          if(status == 0){
            thisObj.successTip();
          }else {
            thisObj.errorTip();
          }
        })
      },
      mobileCheck(mobileNum){
        let regex = new RegExp(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/);
        if(!regex.test(mobileNum)){
          return '请输入正确的手机号码'
        }else {
          return true
        }

      },
      checkpassword(v){
        var numasc = 0;
        var charasc = 0;
        var otherasc = 0;
        if(0==v.length){
          return "密码不能为空";
        }else if(v.length<8||v.length>12){
          return "密码至少8个字符,最多12个字符";
        }else{
          for (var i = 0; i < v.length; i++) {
            var asciiNumber = v.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
              numasc += 1;
            }
            if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {
              charasc += 1;
            }
            if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {
              otherasc += 1;
            }
          }
          if(0==numasc)  {
            return "密码必须含有数字";
          }else if(0==charasc){
            return "密码必须含有字母";
          }else if(0==otherasc){
            return "密码必须含有特殊字符";
          }else{
            return true;
          }
        }
      },

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      successTip() {
        this.$message({
          message: '注册成功',
          type: 'success'
        });
      },
      errorTip(tipStr){
        this.$message({
          message: tipStr,
          type: 'warning'
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .wrapper
    w = 1200px
    .top-nav-bg
      margin-bottom :80px
      background-color :#324157
      .top-nav
        width:w
        margin :0 auto
    .login-box
      width:w
      margin :0 auto
      .login-btn
        width:100%

</style>
