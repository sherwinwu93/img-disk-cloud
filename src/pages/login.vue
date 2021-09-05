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
        <div v-if="type === 'login'" class="d-flex flex-column align-center">
          <img class="mt-n14 mb-10" src="@/assets/img/name4.png"/>
          <div class="d-flex flex-column align-center">
            <v-text-field
                placeholder="请输入用户名"
                dense
                v-model="loginForm.username"
                filled
                rounded
                background-color="#fafafa7c"
            ></v-text-field>
            <v-text-field
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
                dense
                filled
                rounded
                background-color="#fafafa7c"
            ></v-text-field>
            <v-btn @click="login" width="150" rounded color="orange darken-1"
            >登录
            </v-btn
            >
          </div>
          <div class="bottom d-flex justify-space-around align-center">
            <a @click="toSignIn">注册</a>
            <a @click="toResetPassword">忘记密码</a>
          </div>
        </div>
        <!--注册-->
        <div
            v-else-if="type == 'signIn'"
            class="signin d-flex flex-column align-center "
        >
          <span class="label">注册</span>
          <!--              @blur="checkName"-->
          <v-text-field
              v-model="signInForm.username"
              class="input"
              placeholder="请设置用户名"
              dense
              rounded
              filled
              clearable
              color="black"
              hint="用户名长度为3至15位"
              background-color="#fafafa5c"
          ></v-text-field>
<!--          v-model="set_password"-->
          <v-text-field
              v-model="signInForm.password"
              class="input"
              color="black"
              placeholder="请输入密码"
              type="password"
              dense
              rounded
              filled
              clearable
              hint="密码长度为4至18位"
              background-color="#fafafa5c"
          ></v-text-field>
          <v-text-field
              class="input"
              color="black"
              placeholder="请再次输入密码"
              v-model="signInForm.passwordAgain"
              type="password"
              dense
              rounded
              filled
              clearable
              background-color="#fafafa5c"
          ></v-text-field>
          <v-select
              class="input"
              :items="signInForm.questions"
              color="orange darken-4"
              label="请选择密保问题"
              v-model="signInForm.question"
              dense
          ></v-select>
          <v-text-field
              class="input"
              color="black"
              placeholder="密保答案"
              v-model="signInForm.answer"
              dense
              rounded
              filled
              clearable
              hint="答案最多18字"
              background-color="#fafafa5c"
          ></v-text-field>
          <div class="d-flex justify-space-around">
            <v-btn
                @click="cancel"
                width="128"
                rounded
                color="blue-grey lighten-6 mr-5"
            >取消
            </v-btn
            >
            <v-btn
                @click="signIn"
                width="128"
                rounded
                color="orange darken-3 ml-5"
            >注册
            </v-btn
            >
          </div>


        </div>
        <!--重置密码-->
        <div
            v-else
            class="resetpassword d-flex flex-column justify-start align-center"
        >
          <span class="label">重置密码</span>
          <div v-if="resetPasswordForm.type === 0" class="reset">
            <v-text-field
                class="input"
                placeholder="请输入用户名"
                v-model="resetPasswordForm.username"
                dense
                color="black"
                clearable
                filled
                rounded
                background-color="#fafafa6c"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-icon
                  class="mr-11"
                  size="49"
                  tag="button"
                  @click="type = 'login'"
                  color="grey lighten-2"
              >mdi-close-circle-outline</v-icon
              >
              <v-icon
                  key="icon0"
                  size="49"
                  tag="button"
                  @click="showQuestion"
                  color="orange darken-3"
              >mdi-arrow-right-circle-outline</v-icon
              >
            </div>
          </div>
          <div
              v-else-if="resetPasswordForm.type === 1"
              class="reset d-flex flex-column justify-start align-center"
          >
            <span style="fontSize:29px">{{ resetPasswordForm.question }}？</span>
            <v-text-field
                placeholder="请输入答案"
                v-model="resetPasswordForm.answer"
                dense
                color="black"
                filled
                rounded
                clearable
                background-color="#fafafa6c"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-icon
                  class="mr-11"
                  size="49"
                  tag="button"
                  @click="(type = 'login'), (resetPasswordForm.type = 0)"
                  color="grey lighten-2"
              >mdi-close-circle-outline</v-icon
              >
              <v-icon
                  key="icon1"
                  size="49"
                  tag="button"
                  @click="showReset"
                  color="orange darken-3"
              >mdi-arrow-right-circle-outline</v-icon
              >
            </div>
          </div>
          <div
              v-else
              class="reset d-flex flex-column justify-start align-center"
          >
            <v-text-field
                placeholder="请输入密码"
                v-model="resetPasswordForm.password"
                type="password"
                dense
                color="black"
                filled
                rounded
                clearable
                background-color="#fafafa6c"
                hint="密码长度为5至18位"
            ></v-text-field>
            <v-text-field
                placeholder="请再次输入密码"
                v-model="resetPasswordForm.passwordAgain"
                type="password"
                dense
                color="black"
                filled
                rounded
                clearable
                background-color="#fafafa6c"
            ></v-text-field>
            <div class=" d-flex justify-space-around">
              <v-btn
                  @click="cancel"
                  width="129"
                  rounded
                  color="blue-grey lighten-5 mr-5"
              >取消</v-btn
              >
              <v-btn
                  @click="resetPassword"
                  width="129"
                  rounded
                  color="orange darken-2 ml-5"
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
import SparkMD5 from 'spark-md5'
import {http} from '@/utils/http.js'
export default {
  name: "login",
  data() {
    return {
      // login:登录,signIn:注册,resetPassword
      type: 'login',
      contackMe: false,
      loginForm: {
        username: '',
        password: ''
      },
      signInForm: {
        username: '',
        password: '',
        passwordAgain: '',
        questions: [],
        question:'',
        answer:''
      },
      resetPasswordForm: {
        type: 0,
        username: '',
        question: '',
        answer: '',
        realAnswer:'',
        password: '',
        passwordAgain: ''
      }
    }
  },
  methods: {
    async resetPassword() {
      const response = await http({
        url: '/login/resetpassword',
        method: 'post',
        data: {
          user_name: this.resetPasswordForm.username,
          user_password: SparkMD5.hash(this.resetPasswordForm.password)
        }
      });
      if (response.data.code === 808) {
        this.signInForm.username = this.resetPasswordForm.username;
        this.type = 'login';
        this.resetPasswordForm = {
          type: 0,
          username: '',
          question: '',
          answer: '',
          realAnswer:'',
          password: '',
          passwordAgain: ''
        }
        this.$store.commit('message', {
          color: 'success',
          text: '重置密码成功'
        });
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: '重置密码失败'
        });
      }
    },
    showReset() {
      const realAnswer = this.resetPasswordForm.realAnswer;
      const answer = this.resetPasswordForm.answer;
      if (answer && answer === realAnswer) {
        this.resetPasswordForm.type = 3;
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: '回答错误'
        });
        this.resetPasswordForm.answer = '';
      }
    },
    async showQuestion() {
      const response = await http({
        url: '/login/getuserquestion',
        method: 'get',
        params: {
          user_name: this.resetPasswordForm.username
        }
      });
      if (response.data.code === 800) {
        this.resetPasswordForm.question = response.data.data.user_question;
        this.resetPasswordForm.realAnswer = response.data.data.user_answer;
        this.resetPasswordForm.type = 1;
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: '请求失败'
        });
      }
    },
    async signIn() {
      let username = this.signInForm.username;
      let password = this.signInForm.password;
      let passwordAgain = this.signInForm.passwordAgain;
      let question = this.signInForm.question;
      let answer = this.signInForm.answer;
      if (username.length < 5 || username.length > 15) {
        this.$store.commit('message', {
          color: 'error',
          text: '用户名不得小于5,或大于15'
        });
        return false;
      }
      if (password !== passwordAgain) {
        this.$store.commit('message', {
          color: 'error',
          text: '两次密码不一致'
        });
        return false;
      }
      if (answer.length > 20) {
        this.$store.commit('message', {
          color: 'error',
          text: '密码长度不得大于20'
        })
        return false;
      }
      const response = await http({
        url: '/login/signin',
        method: 'post',
        data: {
          user_name: username,
          user_password: SparkMD5.hash(password),
          user_question: question,
          user_answer: answer,
          mock: 'mock'
        }
      });
      if (response.data.code === 820) {
        //注册成功
        this.type = "login";
        this.loginForm.username = username;
        this.signInForm = {
          username: '',
          password: '',
          passwordAgain: '',
          questions: [],
          question:'',
          answer:''
        }
        this.$store.commit('message', {
          color: 'success',
          text: '注册成功'
        })
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: response.data.message
        })
      }
    },
    async login() {
      const config = {
        url: "/login/login",
        method: "post",
        data: {
          user_name: this.loginForm.username,
          user_password: SparkMD5.hash(this.loginForm.password),
        },
      }
      const response = await http(config);
      switch (response.data.code) {
        case 802:
          //登录成功,设置表头
          this.$store.commit('login', {
            user: response.data.data.user,
            token: response.data.data.token,
            folders: response.data.data.folders
          })
          this.$store.commit('message', {
            color: 'success',
            text: '登录成功'
          })
          this.$router.push('/home');
          break;
        case 803:
          // 无此用户
          this.$store.commit('message', {
            color: 'warn',
            text: '无此用户'
          })
          break;
        case 804:
          // 密码错误
          this.$store.commit('message', {
            color: 'error',
            text: '密码错误'
          })
          break;
        default:
          break;
      }
    },
    cancel() {
      this.type = 'login';
    },
    async toSignIn() {
      this.type = 'signIn';
      const response = await http({
        url: '/login/getquestions',
        method: 'get'
      });
      this.signInForm.questions = response.data.data;
    },
    toResetPassword () {
      this.type = 'resetPassword';
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
