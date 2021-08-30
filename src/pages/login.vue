<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      // 显示登陆还是注册
      type: "login",
      set_username: "",
      set_password: "",
      set_password_again: "",
      // 密保问题
      items:[],
      question: "",
      answer: "",
      resetpassword_answer: "",
      reset_type: 1,
      contackMe: false,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
