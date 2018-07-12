<template>
  <div class="account" id="accountPage">
    <!--<div class="bg" id="bg">
      <img src="/static/img/loginB.png" ref="accountBg" id="bg-accountBg" alt="背景图">
    </div>-->
    <Layout>
      <Header>
        <div class="logo">能说话的蛋糕管理后台</div>
      </Header>
    </Layout>
    <div class="container">
      <div class="wapper">
          <div class="right">
          <div class="right-container">
            <div class="right-tab clear-float" style="text-align: center">
              <a href="javascript:void(0);" class="active">管理员登录</a>
            </div>
            <Form :model="account" :rules="ruleCustom" ref="login">
              <FormItem prop="email">
                <Input v-model="account.email" placeholder="用户名"></Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="account.password" placeholder="密码"></Input>
              </FormItem>
              <FormItem class="m-b-15">
                <Button type="success" @click="login" long>登录</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Config from "../../common/js/config";
export default {
  data() {
    const phoneReg = /(^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$)|(^([a-z\d]+(\.|-|_)?)+[a-z\d]+@[a-z\d]{2,}(\.[a-z]{2,}){1,5}$)/i;

    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$store.state.lang.Please_enter_phone_number));
      } else if (!phoneReg.test(value)) {
        callback(
          new Error(
            this.$store.state.lang.incorrect_format_Please_enter_phone_number
          )
        );
      } else {
        callback();
      }
    };

    return {
      config: Config,
      account: { email: "", password: "", checkCode:""},
      ruleCustom: {
      }
    };
  },
  methods: {
    login() {
        let _this = this;
        _this.tool.post(
          {
            url: "/manage/login",
            data: {
              email: _this.account.email,
              password: _this.account.password,
            },
            success(res) {
              console.log(res);
              if (res.user_admin.usertype<200) {
                _this.$Message.success({
                  content: "登录成功"
                });
                _this.$router.replace({ path: "/backstage/companyprofile" });
              }else if (res.user_admin.usertype>=200) {
                // _this.$Message.success({
                //   content: "登录成功"
                // });
                // _this.$router.replace({ path: "/backstage/companyprofile" });
              }
            }
          },
          _this
        );
    }
  },

};
</script>
<style lang="less" scoped>
@import "../../common/less/var.less";

.account {
  .ivu-layout-header {
    height: 90px;
    background-color: @color;
    line-height: 40px;
    padding-top: 0px;
    padding-bottom: 10px;
  }
  .logo {
    color: #fff;
    font-size: 24px;
    width: 50%;
    height: 100%;
    line-height: 80px;
    margin-left:-22px;
    float: left;
  }
  .btn-sendCode {
    display: inline-block;
    width: 86px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    top: 10px;
    right: 0px;
    text-align: center;
    color: @color;
    border-left: 1px solid #bbbec4;
  }
  width: 100%;
  min-height: 367px;
  overflow: hidden;
  a {
    color: #fff;
  }

  .bg {
    position: relative;
    z-index: -1;
    width: 3000px;
    text-align: center;
    overflow: hidden;
    margin-left: -50%;

    img {
      max-width: 2000px;
      max-height: 1200px;
    }
  }

  .container {
    width: 100%;
    position: absolute;
    background: url("../../../static/img/bggg.jpg") no-repeat ;
    background-position: center center;
    height: 570px;
    top: 90px;
    .wapper {
      margin: 30px auto 0;
      width: 1170px;

      .header {
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 16px;

        .arrow {
          display: inline-block;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: @color;
          text-align: center;
          margin-right: 8px;
        }
      }

      .left {
        margin-top: 190px;
        height: 120px;
        border-left: 4px solid #fff;
        color: #fff;
        font-size: 34px;
        padding-left: 20px;
        width: 50%;
        float: left;

        p {
          line-height: 60px;
        }
      }

      .right {
        float: right;
        width: 470px;
        border-radius: 5px;
        background-color: #00c79b;
        margin-top: 100px;

        .right-container {
          width: 300px;
          margin: 20px auto;
          padding: 10px;
          .check-code-img {
              width: 95px;
              height: 40px;
              position: absolute;
              top: 0px;
              right: 0px;
          }
          .right-tab {
            a {
              font-size: 18px;
              display: inline-block;
              height: 40px;
              line-height: 40px;

              &.active {
                color: @black;
                border-bottom: 4px solid @black;
              }
            }
          }

          input[type="text"]{
            height: 40px;
          }
          input[type="password"]{
            height: 40px;
          }
          button[type="button"] {
            height: 40px;
          }

          button[type="button"] {
            font-size: 16px;
          }

          .ivu-checkbox-wrapper {
            color: #fff;
          }

          .ivu-btn-success {
            background-color: #495060;
            border-color: #495060;
          }

          .ivu-form-item:first-child {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>


