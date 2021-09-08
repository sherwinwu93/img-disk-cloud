<template>
  <div>
    <!--    应用栏-->
    <v-app-bar class='orange darken-1' app clipped-left>
      <v-toolbar-title>
        <h2 style="color:white">Miss Yo</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div
          class='app-bar-avatar d-flex justify-center align-center'
          :style="{
          backgroundImage:`url(${$store.state.user.user_avatar})`
        }"
      >
        <v-icon v-if='!$store.state.user.user_avatar' size=30 color="white">mdi-account-circle</v-icon>
      </div>
      <v-btn icon>
        <v-icon large color='white' @click="quit">mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <!--导航栏-->
    <v-navigation-drawer app clipped width='200' permanent>
      <v-list nav>
        <v-list-item v-for='(item,index) of menu' :key='index' color='orange darken-1' link :to='item.link'>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--内容区-->
    <v-main>
      <v-container fluid>
        <!--        <upload></upload>-->
        <transition name="slide-fade" mode='out-in'>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
    </v-main>

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      menu: [
        {icon: 'mdi-timeline-text', title: '时光轴', link: '/home/timeline'},
        {icon: 'mdi-image', title: '照片管理', link: '/home/image'},
        {icon: 'mdi-video', title: '视频管理', link: '/home/video'},
        {icon: 'mdi-folder', title: '收藏夹', link: '/home/folder'},
        {icon: 'mdi-account-cog', title: '个人设置', link: '/home/profile'},
      ]
    }
  },
  methods: {
    quit() {
      this.$store.commit('quit');
      this.$router.push('/login');
    },
  }
}
</script>

<style lang="scss" scoped>
.app-bar-avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
</style>
