<template>
  <div>
  <!--顶部信息栏:工作表sheet-->
    <v-sheet
        class="bar d-flex justify-end align-center"
        height="45"
        color="#0808084d"
    >
      <div class="pt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind='attrs' v-on='on'  href="https://gitee.com/onlypluto/image-cloud-disk"
            ><img src="@/assets/img/github.png"
            /></a>
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

</style>
