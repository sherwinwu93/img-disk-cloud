<template>
  <div class="login d-flex justify-center align-center">
    <!--顶部信息栏:工作表sheet-->
    <v-sheet
        class="bar d-flex justify-end align-center"
        height="45"
        color="#0808084d"
    >
      <!--pt-2上下居中-->
      <div class="pt-2">
        <!--提示-->
        <v-tooltip buttom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind='attrs' v-on="on" href="https://github.com">
              <img src="@/assets/img/github.png">
            </a>
          </template>
          <span>代码仓库</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind='attrs' v-on='on'><img @click="contackMe = true" src="@/assets/img/weixin.png"/></a>
          </template>
          <span>联系维护者</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind='attrs' v-on='on' href="https://www.alonepluto.info/free"
            ><img src="@/assets/img/find.png"
            /></a>
          </template>
          <span>发现更多</span>
        </v-tooltip>
      </div>
    </v-sheet>
    <!--    card:卡片, 对话框-->
    <v-card
        class="box d-flex flex-column justify-center align-center"
        height="600"
        width="500"
        color="#00000060"
    >
      <!--登录对话框-->
      <template>
        <div v-if="false" class="d-flex flex-column align-center">
          <img class="mt-n14 mb-10" src="@/assets/img/name4.png"/>
          <div class="d-flex flex-column align-center">
            <v-text-field
                placeholder="请输入用户名"
                dense
                v-model="username"
                filled
                rounded
                background-color="#fafafa7c"
            ></v-text-field>
            <v-text-field
                placeholder="请输入密码"
                type="password"
                dense
                filled
                rounded
                background-color="#fafafa7c"
                v-model="password"
            ></v-text-field>
            <v-btn @click="login" width="150" rounded color="orange darken-1"
            >登录
            </v-btn
            >
          </div>
          <div class="bottom d-flex justify-space-around align-center">
            <a @click="tosignin">注册</a>
            <a>忘记密码</a>
          </div>
        </div>
        <!--注册-->
        <div v-if="false" class="signin d-flex flex-column align-center">
          <span class="label">注册</span>
          <v-text-field
              class="input"
              placeholder="请设置用户名"
              v-model="set_username"
              dense
              rounded
              filled
              clearable
              color="black"
              @blur="checkName"
              hint="用户名长度为5至15位"
              background-color="#fafafa7c"
          ></v-text-field>
          <v-text-field
              class="input"
              color="black"
              placeholder="请输入密码"
              v-model="set_password"
              type="password"
              dense
              rounded
              filled
              clearable
              hint="密码长度为6至18位"
              background-color="#fafafa7c"
          ></v-text-field>
          <v-text-field
              class="input"
              color="black"
              placeholder="请再次输入密码"
              v-model="set_password_again"
              type="password"
              dense
              rounded
              filled
              clearable
              background-color="#fafafa7c"
          ></v-text-field>
          <v-select
              class="input"
              :items="items"
              color="orange darken-2"
              label="请选择密保问题"
              v-model="question"
              dense
          ></v-select>
          <v-text-field
              class="input"
              color="black"
              placeholder="密保答案"
              v-model="answer"
              dense
              rounded
              filled
              clearable
              hint="答案最多20字"
              background-color="#fafafa7c"
          ></v-text-field>
          <div class="d-flex justify-space-around">
            <v-btn
                width="130"
                rounded
                color="blue-grey lighten-4 mr-5"
            >取消
            </v-btn>
            <v-btn
                width="130"
                rounded
                color="orange darken-1 ml-5"
            >注册
            </v-btn>
          </div>
        </div>
        <!--重置密码-->
        <div v-if="true" class="resetpassword d-flex flex-column justify-start align-center">
          <span class="label">重置密码</span>
          <div v-if="false" class="reset">
            <v-text-field
                class="input"
                placeholder="请输入用户名"
                v-model="username"
                dense
                color="black"
                clearable
                filled
                rounded
                background-color="#fafafa7c"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-icon
                  class="mr-10"
                  size="50"
                  tag="button"
                  @click="type = 'login'"
                  color="grey lighten-1"
              >mdi-close-circle-outline
              </v-icon
              >
              <v-icon
                  key="icon1"
                  size="50"
                  tag="button"
                  @click="showQuestion"
                  color="orange darken-2"
              >mdi-arrow-right-circle-outline
              </v-icon
              >
            </div>
          </div>
          <div v-if="false"
               class="reset d-flex flex-column justify-start align-center">
            <span style="font-size: 30px">你老婆是?</span>
            <v-text-field
                placeholder="请输入答案"
                v-model="resetpassword_answer"
                dense
                color="black"
                filled
                rounded
                clearable
                background-color="#fafafa7c"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-icon
                  class="mr-10"
                  size="50"
                  tag="button"
                  @click="(type = 'login'), (reset_type = 1)"
                  color="grey lighten-1"
              >mdi-close-circle-outline</v-icon
              >
              <v-icon
                  key="icon2"
                  size="50"
                  tag="button"
                  @click="showReset"
                  color="orange darken-2"
              >mdi-arrow-right-circle-outline</v-icon
              >
            </div>
          </div>
          <div v-if="true" class="reset d-flex flex-column justify-start align-center">
            <v-text-field
                placeholder="请输入密码"
                v-model="set_password"
                type="password"
                dense
                color="black"
                filled
                rounded
                clearable
                background-color="#fafafa7c"
                hint="密码长度为6至18位"
            ></v-text-field>
            <v-text-field
                placeholder="请再次输入密码"
                v-model="set_password_again"
                type="password"
                dense
                color="black"
                filled
                rounded
                clearable
                background-color="#fafafa7c"
            ></v-text-field>
            <div class=" d-flex justify-space-around">
              <v-btn
                  @click="cancel"
                  width="130"
                  rounded
                  color="blue-grey lighten-4 mr-5"
              >取消</v-btn
              >
              <v-btn
                  @click="reset"
                  width="130"
                  rounded
                  color="orange darken-1 ml-5"
              >重置</v-btn
              >
            </div>
          </div>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      // 控制显示
      type: "login",
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-image: url("../assets/img/bg1.jpg");
  background-size: cover;
}

.bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  div {
    display: flex;
    align-items: center;

    img {
      margin: 0px 15px;
      height: 28px;
      width: 28px;
    }
  }
}

//对话框样式
.box {
  position: relative;

  div {
    width: 80%;
    margin: 20px 0px;
  }

  img {
    width: 450px;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 50px;
  }
}

.signin, .resetpassword {
  .label {
    color: var(--theme-color);
    font-size: 60px;
  }
}

.reset {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  height: 30px;
}
</style>
