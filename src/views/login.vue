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
            <el-input v-model="userName" placeholder="请输入账号" type="text"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <el-input v-model="userPwd" placeholder="请输入密码" type="password"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click=postUserMessage class="login-btn">登陆</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    data(){
          return{
            userName:'',
            userPwd:'',
            activeIndex:'1'
          }

      },
      mounted(){
          this.getUserList();
      },
      methods:{
        getUserList(){
          axios.get("/api/login", {}).then(function (response) {
            var res = response.data
            console.log('获取用户信息数据成功')
          })
        },
        postUserMessage(){
            var thisObj = this;

            axios.post("/api/login", {
                userName:this.userName,
                userPwd:this.userPwd
            }).then(function (res) {
                console.log(thisObj)
                var status = res.data.status
                if(status == 0){
                  thisObj.successTip();
                }else {
                  thisObj.errorTip();
                }
            })
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        successTip() {
          this.$message({
            message: '登陆成功',
            type: 'success'
          });
        },
        errorTip(){
          this.$message({
            message: '账号或密码错误',
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
