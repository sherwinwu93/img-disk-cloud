<template>
  <div>
    <v-overlay opacity="0">
      <v-card
          class="d-flex"
          width="80vw"
          height="45vw"
          color="grey darken-4"
      >
        <!--        左侧-->
        <div class="folder-info d-flex justify-center">
          <span class="folder-title">{{folder}}</span>
          <div class="info-detail">
            <span>共计{{image_counter}}张照片,{{video_counter}}个视频</span>
          </div>
        </div>
        <!--        右侧-->
        <div class="folder-content d-flex flex-column">
          <div class="d-flex justify-end" style="width:100%">
            <!--            关闭folderShow-->
            <v-icon @click="closeFolder" color="red" tag="button"
            >mdi-close-circle
            </v-icon>
          </div>
          <div class="d-flex flex-wrap">
            <div
                v-for="(item, index) in files"
                :key="index"
                class="content d-flex flex-column align-center">
              <v-card hover class="rounded-0">
                <div class="box d-flex align-center justify-center"
                     :style="{
                        backgroundImage: `url(${item.file_mini})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }"
                >
                  <v-icon
                      v-if="/video/.test(item.file_type)"
                      color="orange"
                      x-large
                  >mdi-play-circle-outline
                  </v-icon>
                </div>
              </v-card>
              <span>{{item.file_name}}</span>
            </div>
          </div>
        </div>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "folderShow",
  data() {
    return {
      image_counter: 0,
      video_counter: 0,
      //文件列表
      files: [],
      //正在打开的文件
      file: null,
    }
  },
  props: {
    folder: String
  },
  mounted() {
    this.init();
    this.$bus.$on('fileHandle', this.fileHandle);
  },
  methods: {
    async init() {
      const response = await http({
        url: '/data/getFolderData',
        method: 'get',
        params: {
          folder: this.folder
        }
      });
      this.files = response.data.data.result;
      this.image_counter = response.data.data.counter.image;
      this.video_counter = response.data.data.counter.video;
    },
    closeFolder() {
      this.$emit("update:folder", null);
    },
    fileHandle(arg) {
      const {type, file_id, file_memo, file_folder, current_folder, file} = arg;
      if (type == 'delete') {
        for (let index in this.files) {
          if (this.files[index].file_id == file_id) {
            this.files.splice(index, 1);
          }
        }
      } else if (type == 'edit') {//修改备忘
        for (let item in this.files) {
          if (item.file_id == file_id) {
            item.file_memo = file_memo;
          }
        }
      } else {
        if (this.folder == current_folder) {
          for (let index in this.files) {
            if (this.files[index].file_id == file_id) {
              this.files.splice(index, 1);
            }
          }
        }
        //加入新的收藏夹
        if (this.folder == file_folder) {
          this.files.push(file);
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .folder-info {
    border-right: 1px black solid;
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    padding: 10px;
    position: relative;
    .folder-title {
      font-size: 30px;
      color: #bdbdbd;
      margin-top: 100px;
    }
    .info-detail {
      position: absolute;
      bottom: 20px;
      right: 20px;
      span {
        font-weight: 900;
        margin: 0 2px;
        color: var(--theme-color);
      }
    }
  }
  .folder-content {
    width: 75%;
    height: 100%;
    padding: 10px;
    overflow: scroll;
  }
  .content {
    height: 150px;
    width: 150px;
    margin-top: 30px;
    span {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //显示几行
    }
  }
  .box {
    height: 100px;
    width: 100px;
  }
</style>
