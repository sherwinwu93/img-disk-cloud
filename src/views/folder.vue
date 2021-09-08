<template>
  <div class="folder d-flex flex-wrap">
    <folder-show
        v-if="folder_click"
        :folder.sync="folder_click"
        :key="folder_click"
    ></folder-show>
    <div class="d-flex flex-column " style="width:inherit">
      <!-- 文件区域 -->
      <div class="d-flex flex-wrap">
        <!--        迭代文件夹-->
        <div
            v-for="(item, index) in folders"
            :key="index"
            :id="item"
            class="folder-box d-flex flex-column align-center mr-10 mt-2"
            draggable
            @dragstart="startDrag(item)"
            @dragend="(drag_start = false), (delete_zone = false)"
            @click="folder_click = item"
        >
          <v-icon size="80" color="orange lighten-3">mdi-folder</v-icon>
          <span>{{item}}</span>
        </div>
        <!--        新增文件夹-->
        <div
            @click="dialog1 = true"
            class="folder-box1 d-flex flex-column align-center mr-10 mt-2"
        >
          <v-icon size="80" color="white">mdi-plus</v-icon>
          <span>新建文件夹</span>
        </div>
        <!--        删除区域-->
        <div
            v-if="delete_zone"
            @dragenter="enterDeletezone"
            dropzone
            class="delete-zone mt-12 d-flex justify-center align-center"
        >
          <v-icon v-if="!drag_start" size="60">mdi-delete-outline</v-icon>
          <v-icon v-else size="60" color="red">mdi-delete-empty-outline</v-icon>
        </div>
      </div>
    </div>
    <!--    新建文件夹对话框-->
    <v-dialog v-model="dialog1" width="400" @click:outside="folder_name = ''">
      <v-card
          class="d-flex flex-column justify-space-around align-center pt-10 pb-10"
          height="500"
          width="400"
          color="#000000a4"
      >
        <span class="found-title">新建文件夹</span>
        <v-icon size="100" color="orange lighten-3">mdi-folder</v-icon>
        <div style="width:80%">
          <v-text-field
              v-model="folder_name"
              color="orange darken-2"
              outlined
          ></v-text-field>
        </div>
        <div class="d-flex justify-space-around">
          <!--      使用,可以写多个语句        -->
          <v-btn
              placeHolder="请输入文件夹名"
              width="130"
              rounded
              color="blue-grey lighten-4 mr-5"
              @click="(dialog1 = false), (folder_name = '')"
          >取消
          </v-btn>
          <v-btn width="130" rounded color="orange darken-2 "
                 @click="found"
          >创建
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "folder",
  data() {
    return {
      folders: [],
      //新建文件夹对话框
      dialog1: false,
      //新建文件夹名称
      folder_name: "",
      //文件夹展示
      folder_click: false,
      // 切换拖曳图标
      drag_start: false,
      // 正在被拖曳的文件
      current_drag: "",
      // 删除区域的显示
      delete_zone: false,
    }
  },
  created() {
    this.folders = this.$store.state.folders;
  },
  methods: {
    startDrag(item) {
      //延迟点时间再拖曳
      setTimeout(() => {
        this.drag_start1 = true;
      }, 200);
      this.delete_zone = true;
      this.current_drag = item;
    },
    async found() {
      if (
        this.folder_name.length == 0 ||
        /[^0-9a-zA-Z\u4e00-\u9fa5]/.test(this.folder_name)
      ) {
        this.$store.commit('message', {
          color: 'error',
          text: '非法文件名'
        });
        return false;
      }
      const response = await http({
        url: '/data/foundfolder',
        method: 'post',
        data: {
          folder_name: this.folder_name,
        }
      });
      if (response.data.code == 808) {
        //更新store的文件夹数据
        this.$store.commit('updateFolder', this.folder_name);
        this.$store.commit('message', {
          color: 'success',
          text: '创建收藏夹成功'
        });
        this.dialog1 = false;
        this.folder_name = '';
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: response.data.message
        });
      }
    },
    //拖拽文件到删除区域
    async enterDeletezone() {
      const response = await http({
        url: '/data/deletFolder',
        method: 'delete',
        data: {
          folder_name: this.current_drag,
        },
      });
      if (response.data.code == 808) {
        this.$store.commit('deleteFolder', this.current_drag);
        this.$store.commit('message', {
          color: 'success',
          text: '删除收藏夹成功'
        });
        this.$bus.$emit('fileHandle', {
          type: 'deleteFolder',
          folder_name: this.current_drag
        });
      } else {
        this.$store.commit('message', {color: 'error', text: '删除收藏夹失败'});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .folder {
    width: 100%;
  }
  .found-title {
    color: var(--theme-color);
    font-size: 40px;
  }
  .folder-box {
    width: 110px;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: #eeeded;
    }
    border-radius: 4px;
    span {
      font-size: 14px;
    }
  }
  .folder-box1 {
    width: 110px;
    padding: 5px;
    cursor: pointer;
    background-color: #eeeded;
    &:hover {
      background-color: #cecdcd;
    }
    border-radius: 4px;
    span {
      font-size: 14px;
      color: rgb(121, 120, 120);
    }
  }
  .delete-zone {
    width: 100%;
    height: 100px;
    border: 2px red dashed;
  }
</style>
