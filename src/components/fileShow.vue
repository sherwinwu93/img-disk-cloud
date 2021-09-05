<template>
  <div>
    <v-dialog v-model='folderDialog' width="400" hide-overlay>
      <v-card
          class="d-flex flex-column justify-space-around align-center pt-10 pb-10"
          height="500"
          width="400"
      >
        <span style='color: #f57c00;fontSize: 40px;'>加入到收藏夹</span>
        <v-icon size="100" color="orange lighten-3">mdi-folder</v-icon>
        <div style="width:80%">
          <v-select
              :items="this.$store.state.folders"
              color="orange darken-2"
              item-color="orange darken-2"
              label="请选择收藏夹"
              v-model="folder"
              dense
          ></v-select>
        </div>
        <div class="d-flex justify-space-around">
          <v-btn
              @click="folderDialog = false"
              width="130"
              rounded
              color="blue-grey lighten-4 mr-5"
          >取消
          </v-btn
          >
          <v-btn @click="addToFolder" width="130" rounded color="orange darken-1 "
          >加入
          </v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model='deleteDialog' width="400" hide-overlay>
      <v-card
          class="d-flex flex-column justify-space-around align-center pt-10 pb-10"
          height="300"
          width="400"
      >
        <span style='color: #f57c00;fontSize: 30px;'>确定删除吗？</span>
        <div class="d-flex justify-space-around">
          <v-btn
              @click="deleteDialog = false"
              width="110"
              rounded
              color="blue-grey lighten-4 mr-5"
          >取消
          </v-btn
          >
          <v-btn @click="deleteFile" width="110" rounded color="orange darken-1"
          >确定
          </v-btn
          >
        </div>
      </v-card>

    </v-dialog>
    <v-overlay>
      <!--      click.self:点击图片外部,关闭组件-->
      <div
          class="file-show d-flex align-center justify-center"
          @click.self="outClick"
      >
        <v-card
            class="box rounded-0 d-flex align-center"
            height="45vw"
            width="85vw"
            color="#000000a4"
        >
          <v-icon class="close-icon" color="red" tag="button" @click="outClick">
            mdi-close-circle
          </v-icon>
          <v-img
              v-if="/image/.test(file_data.file_type)"
              :src="file_data.file_src"
              width="70%"
              height="100%"
              contain
          ></v-img>
          <video
              v-if="/video/.test(file_data.file_type)"
              controls
              :src="file_data.file_src"
              width="70%"
              height="100%"
          ></video>
          <div class="content">
            <div class="d1 d-flex flex-column justify-center align-center">
              <div class="d1-1 d-flex justify-start">
                <v-icon color="#bdbdbd" size="50" class="d1-1-icon"
                >mdi-format-quote-close
                </v-icon
                >
              </div>
              <!--              用||,设置默认值-->
              <h2 v-if="!editDialog" @dblclick="deleteDialog=true">{{ file_data.file_memo || "无备忘" }}</h2>
              <div v-else style="height:80px">
                <v-text-field
                    v-model="memo"
                    autofocus
                    placeholder="请填写备忘，最大不超过50字"
                    color="orange darken-2"
                    counter="50"
                    @keydown.enter="editMemo"
                    @blur="editMemo"
                ></v-text-field>
              </div>

              <div class="d1-2 d-flex justify-end">
                <v-icon color="#bdbdbd" size="50"
                >mdi-format-quote-close
                </v-icon>
              </div>
            </div>
            <div class="d2 d-flex flex-column justify-end align-center">
              <div class="file-info d-flex flex-column align-start">
                <span
                >名称：<span>{{ file_data.file_name }}</span></span
                >
                <span
                >照片大小：<span>{{file_data.file_size | formatSize}}MB</span></span
                >
                <span
                >上传时间：<span>{{ file_data.file_time }}</span></span
                >
                <span
                >收藏夹：<span>{{ file_data.file_folder }}</span></span
                >
              </div>
              <div
                  class="file-handle mb-10 d-flex justify-space-around align-center"
              >
                <v-btn small fab color="red darken-3" @click="deleteDialog=true">
                  <v-icon>
                    mdi-delete-forever
                  </v-icon>
                </v-btn>
                <v-btn small fab color="blue accent-4" @click="folderDialog=true">
                  <v-icon>
                    mdi-folder
                  </v-icon>
                </v-btn>
                <v-btn small fab color="green darken-3" @click="downloadFile">
                  <v-icon>
                    mdi-download
                  </v-icon>
                </v-btn>
                <v-btn small fab color="orange darken-1" @click="editDialog=true">
                  <v-icon>
                    mdi-lead-pencil
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </v-overlay>

  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "fileShow",
  data() {
    return {
      //收藏夹对话框
      folderDialog: false,
      //删除对话框
      deleteDialog: false,
      //编辑对话框
      editDialog: false,
      //备忘录
      memo: '',
      //选中的文件夹
      folder: '',
    }
  },
  props: {
    file: Object,
  },
  computed: {
    //使用计算属性???
    file_data: function () {
      return this.file;
    }
  },
  methods: {
    // 利用.self修饰符,点击图片外部,关闭组件
    outClick() {
      //子组件和的file和父组件的file同步, 同时更新父子组件,更新file为null,
      this.$emit('update:file', null);
    },
    async addToFolder() {
      if (this.folder == this.file_data.file_folder) {//没改变,直接关闭
        this.folderDialog = false;
        this.$store.commit('message', {color: 'warn', text: '该文件已在收藏夹中,操作无效'})
        return;
      }
      const response = await http({
        url: '/data/addFolder',
        method: 'post',
        data: {
          file_id: this.file_data.file_id,
          file_folder: this.folder
        }
      })
      if (response.data.code === 808) {
        this.$store.commit('message', {color: 'success', text: '已加入收藏夹'});
        this.$bus.$emit('fileHandle', {
          type: 'add',
          file_id: this.file.file_id,
          file_folder: this.file.file_folder,
          current_folder: this.file_data.file_folder,
          file: this.file
        })
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: '操作失败'
        })
      }
      this.folderDialog = false;
    },
    async deleteFile() {
      const response = await http({
        url: '/data/deleteFIle',
        method: 'delete',
        data: {
          file_id: this.file.file_id
        }
      });
      if (response.data.code === 808) {
        this.snackbar.show = true;
        this.snackbar.color = 'success';
        this.snackbar.text = '删除成功'
        this.$emit('update:file', null);
        this.$bus.$emit('fileHandle', {type: 'delete', file_id: this.file.file_id})
        this.$store.commit('message', {color: 'success', text: '删除成功'})
      } else {
        this.$store.commit('message', {color: 'error', text: '删除失败'})
      }
    },
    // 编写备忘
    async editMemo() {
      if (this.memo.length == 0) {
        this.editDialog = false;
        this.$store.commit('message', {
          color: 'error',
          text: '备忘内容为空'
        })
        return
      }
      if (this.memo.length > 50) {
        this.$store.commit('message', {
          color: 'error',
          text: '备忘字数不可超过50字'
        })
        return
      }
      const response = await http({
        url: '/data/editMemo',
        method: 'put',
        data: {
          file_id: this.file_data.file_id,
          file_memo: this.memo
        }
      })
      if (response.data.code === 808) {
        this.$store.commit('message', {
          color: 'success',
          text: '备忘编辑成功'
        })
        this.file_data.file_memo = this.memo
        this.$bus.$emit('fileHandle', {
          type: 'edit',
          file_id: this.file_id,
          file_memo: this.memo
        })
      } else {
        this.$store.commit('message', {
          color: 'error',
          text: '备忘编辑失败'
        })
      }
      this.editDialog = false;
    },
    // 下载
    downloadFile() {
      const a = document.createElement('a');
      a.setAttribute('href', this.file.file_src);
      // 自点击事件下载
      a.click();
      this.$store.commit('message', {color: 'success', text: '已开始下载'})
    }
  },
}
</script>

<style lang="scss" scoped>
.file-show {
  width: 100vw;
  height: 100vh;
}
.box {
  position: relative;
}
.close-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
.content {
  overflow: hidden;
  width: 30%;
  height: 100%;
  padding: 0px 10px;
  border-left: 2px black solid;
  .d1 {
    height: 50%;
    div {
      width: 100%;
    }
    .d1-1-icon {
      transform: rotate(180deg);
    }
  }
  .d2 {
    height: 50%;
  }
}
.file-info {
  width: 100%;
  margin-bottom: 50px;
  span {
    margin: 5px 0px;
    color: #bdbdbd;
    span {
      color: var(--theme-color);
    }
  }
}
.file-handle {
  width: 100%;
}
</style>
