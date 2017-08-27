<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="宝宝姓名" prop="childName">
      <el-input v-model="ruleForm.childName"></el-input>
    </el-form-item>
    <el-form-item label="宝宝生日" required>
      <el-col :span="24">
        <el-form-item prop="childDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.childDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="宝宝班级" required>
      <el-radio-group v-model="ruleForm.childClass">
        <el-radio label="大班"></el-radio>
        <el-radio label="中班"></el-radio>
        <el-radio label="小班"></el-radio>
        <el-radio label="兴趣班"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="家庭手机" prop="mobile">
      <el-input type="age" v-model.number="ruleForm.childPhone" auto-complete="off"></el-input>
    </el-form-item>
    <!--<el-form-item label="父母姓名" prop="childName">
      <el-input v-model="ruleForm.parentName"></el-input>
    </el-form-item>-->

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          childName: '',
          childDate: '',
          childClass:'',
          parentName:'',
          childPhone:''
        },
        rules: {
          childName: [
            { required: true, message: '请输入宝宝姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          childDate: [
            { type: 'date', required: true, message: '请选择宝宝日期', trigger: 'change' },
          ],
          mobile: [
            { required: true, message: '号码不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('success submit');
            axios.post('/api/childInfo',{
              childName: this.ruleForm.childName,
              childDate: this.ruleForm.childDate,
              childClass:this.ruleForm.childClass,
              parentName:this.ruleForm.parentName,
              childPhone:this.ruleForm.childPhone
            }).then(function (res) {
              console.log('提交。。。')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
