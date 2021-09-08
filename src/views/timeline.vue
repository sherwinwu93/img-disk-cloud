<template>
  <div id="timeline">
    <context-menu
        v-if="rightClick_item"
        :offset="offset"
        :file.sync="rightClick_item"
    ></context-menu>
    <file-show v-if="current" :file.sync="current"></file-show>
    <v-timeline dense align-top v-if='files.length'>
      <v-timeline-item
          v-for="(items, index) in files"
          :key="index"
          fill-dot
          small
          color="orange darken-2">
        <v-card class="elevation-2">
          <v-card-title class="headline mb-n5">
            {{items[0].file_time}}
          </v-card-title>
          <v-card-text class="d-flex justify-start align-center flex-wrap">
            <v-card
                v-for="(item, index) of items"
                :key="index"
                hover
                class="rounded-0 mt-5 mr-5"
                @click.right.prevent="rightClick(item)"
                @click="current=item"
            >
              <div
                  class="box d-flex align-center justify-center"
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
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "timeline",
  data() {
    return {
      //右键选中的文件
      rightClick_item: null,
      //打开的文件
      current: null,
      files: [],
      offset: {
        x: '',
        y: '',
      },
      scroll_height: 0,
      client_height: 0,
      page: 0,
      //已请求后台全部数据
      isAll: false,
    }
  },
  async created() {
    const result = await this.getData();
    this.files = result;
    this.$nextTick(() => {
      this.scroll_height = document.documentElement.scrollHeight;
      this.client_height = document.documentElement.clientHeight;
    });
  },
  mounted() {
    this.$bus.$on('fileHandle', this.fileHandle);
    this.$bus.$on('upload', this.fileUpload);
    window.addEventListener('scroll', async () => {
      if (
        document.documentElement.scrollTop == this.scroll_height - this.client_height &&
        !this.isAll
      ) {
        const result = await this.getData();
        if (result.length == 0) {
          this.isAll = true;
          return;
        }
        for (let item of result) {
          this.files.push(item);
        }
        this.$nextTick(() => {
          this.scroll_height = document.documentElement.scrollHeight;
          this.client_height = document.documentElement.clientHeight;
        })
      }
    })
  },
  methods: {
    rightClick(item) {
      this.offset.x = event.clientX;
      this.offset.y = event.clientY;
      this.menuShow = true;
      this.rightClick_item = item;
    },
    async getData() {
      const response = await http({
        url: '/data/getTimelineDataLimit',
        method: 'get',
        params: {
          page: this.page,
          limit: 5,
        },
      });
      this.page++;
      return response.data.data;
    }
  },
  fileHandle(arg) {
    const {type, file_id, file_memo, file_folder, folder_name} = arg;
    if (type == "delete") {
      // 双循环
      for (let index in this.files) {
        for (let i in this.files[index]) {
          if (this.files[index][i].file_id == file_id) {
            this.files[index].splice(i, 1);
            //如果删除的是当日的最后一个文件，则将整个数组从this.files移除
            if (this.files[index].length == 0) {
              this.files.splice(index, 1)
            }
            break;
          }
        }
      }
    } else if (type == "edit") {
      for (let index in this.files) {
        for (let i in this.files[index]) {
          if (this.files[index][i].file_id == file_id) {
            this.files[index][i].file_memo = file_memo;
            break;
          }
        }
      }
    } else if (type == 'deleteFolder') {
      for (let index in this.files) {
        for (let i in this.files[index]) {
          if (this.files[index][i].file_folder == folder_name) {
            this.files[index][i].file_folder = '';
            break;
          }
        }
      }
    } else {
      for (let index in this.files) {
        for (let i in this.files[index]) {
          if (this.files[index][i].file_id == file_id) {
            this.files[index][i].file_folder = file_folder;
            break;
          }
        }
      }
    }
  },
  fileUpload(arg) {
    if (this.files.length == 0 || this.files[0][0].file_time !== arg[0].file_time) {
      this.files.unshift(arg.reverse());
    } else {
      this.files[0].unshift(...arg.reverse());
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 150px;
  width: 150px;
}
</style>