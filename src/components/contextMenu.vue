<template>
  <div @click.right.prevent=''>
    <v-overlay opacity="0">
      <div class="bg" @click.self="outClick">
        <div
            :style="{
              zIndex: 100,
              position: 'fixed',
              top: `${y}px`,
              left: `${x}px`,
          }"
        >
          <v-list min-width="165" elevation="2" light>
            <v-list-item-group>
              <v-list-item
                  dense
                  v-for="(item, index) of menuList"
                  :key="index"
                  @click="handle(item.fn)"
                  color="orange darken-1"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon" :color="item.color"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{item.title}}</v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "contextMenu",
  data() {
    return {
      client_width: '',
      client_height: '',
      menuList: [
        {icon: 'mdi-folder-open', title: '打开', color: 'blue accent-4', fn: 'open'},
        {icon: 'mdi-rename-box', title: '重命名', color: 'orange darken-1', fn: 'rename'},
        {icon: 'mdi-delete-forever', title: '删除', color: 'red darken-3', fn: 'delete'},
        {icon: 'mdi-cloud-download', title: '下载', color: 'green darken-3', fn: 'download'},
      ]
    }
  },
  computed: {
    x: function () {
      if (this.client_width - this.offset.x > 170) {
        return this.offset.x;
      } else {
        return this.offset.x - 166;
      }
    },
    y: function () {
      if (this.client_height - this.offset.y > 175) {
        return this.offset.y;
      } else {
        return this.offset.y - 175;
      }
    }
  },
  methods: {
    outClick() {
      this.$emit('update:file', null);
      //移除滚动监听事件
      window.removeEventListener('scroll', this.listenerScroll);
    },
    handle(fn) {
      //调用
      this[fn]();
      //关闭
      this.$emit('update:file', null);
    },
    listenerScroll() {
      this.outClick();
    },
    open() {
      this.$parent.current = this.file
    },
    async delete() {
      const response = await http({
        url: '/data/deleteFile',
        method: 'delete',
        data: {
          file_id: this.file.file_id,
        },
      });
      if (response.data.code === 808) {
        this.$emit('update:file', null);
        this.$bus.$emit('fileHandle', {
          type: 'delete',
          file_id: this.file.file_id,
        });
        this.$store.commit('message', {
          color: 'success',
          text: '删除成功'
        })
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: '删除失败'
        })
      }
    },
    download() {
      const a = document.createElement('a');
      a.setAttribute('href', this.file.file_src);
      a.click();
      this.$store.commit('message', {
        color: 'success',
        text: '已开始下载'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>