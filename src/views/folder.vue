<template>
  <div class="folder d-flex flex-wrap">
    <folder-show
      v-if="folder_click"
      :floder.sync="folder_click"
      :key="folder_click"
    ></folder-show>
    <div class="d-flex flex-column" style="width: inherit">
<!--      文件区域-->
      <div class="d-flex flex-wrap">
        <div
            v-for="(item, index) of folders"
            :key="index"
            :id="item"
            class="folder-box d-flex flex-column align-center mr-10 mt-2"
            draggable
            @click="folder_click = item"
            @dragstart="startDrag(item)"
            @dragend="(drag_start = false), (delete_zone = false)"
        >
          <v-icon size="80" color="orange lighten-3">mdi-folder</v-icon>
          <span>{{ item }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "folder",
  data() {
    return {
      folders: '',
      dialog1: false,
      folder_name: "",
      folder_click: "",
      // 切换拖曳图标
      drag_start: false,
      // 当前正在被拖曳的文件
      current_drag: "",
      // 控制删除区域的显示
      delete_zone: false,
    }
  },
  created() {
    this.folders = this.$store.state.folders;
  },
  methods: {
    async found() {
      if (this.folder_name.length == 0||
          /[^0-9a-zA-Z\u4e00-\u9fa5]]/.test(this.folder_name)
      ) {
        this.$store.commit('message', {color:'error', text:'非法文件名'})
        return false
      }
      const response = await http({
        url: '/data/foundfolder',
        method: 'post',
        data: {
          folder_name: this.folder_name
        }
      })
      if (response.data.code == 808) {
        this.$store.commit('updateFolder', this.folder_name);
        this.$store.commit('message', {color: 'success', text:'创建收藏夹成功'})
        this.dialog1 = false;
        this.folder_name = '';
      } else {
        this.$store.commit('message', {color: 'error', text: response.data.message})
      }
    }
  }
}
</script>

<style scoped>

</style>
