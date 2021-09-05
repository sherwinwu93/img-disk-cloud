<template>
  <div>
<!--    消息提醒-->
    <v-snackbar v-model="snackbar.show" top :color="snackbar.color" :timeout="snackbar.timeout">
      <span class='d-flex justify-center align-center'>{{ snackbar.text }}</span>
    </v-snackbar>
<!--    文件详情页-->
<!--    :file.sync="file' 双向同步-->
    <file-show v-if="file" :file.sync="file"></file-show>
<!--    卡片:标题,搜索,列表,页眉-->
    <v-card>
<!--      标题+搜索-->
      <v-card-title>
        <h1>数据列表</h1>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            color='orange darken-1'
            append-icon="mdi-magnify"
            label="表内查询"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
<!--      列表+页眉-->
<!--      header,body,footer-->
      <v-data-table
          v-model="selected"
          :headers="headers"
          :items="file_list_computed"
          :items-per-page="5"
          class="elevation-1"
          show-select
          :search="search"
          checkbox-color='orange darken-1'
      >
<!--        文件缩略图-->
<!--        v-slot:绑定数据,子元素替换插入实际的数据-->
        <template v-slot:item.file_mini="{item}">
          <div
              class="file-box d-flex justify-center align-center"
              :style='{backgroundImage:`url(${item.file_mini})`}'
          >
            <v-icon v-if="/video/.test(item.file_type)" color="orange">mdi-play-circle-outline</v-icon>
          </div>
        </template>
<!--        文件大小转换-->
        <template v-slot:item.file_size="{item}">
          <div>
<!--            过滤器转换大小, Vue.filter('formatSiz', function())-->
            <span>{{item.file_size | formatSize}}MB</span>
          </div>
        </template>
<!--        替换的字段-->
        <template v-slot:item.handle="{ item }">
          <div class='d-flex justify-start align-center'>
            <v-btn fab small elevation="0" class='mr-5' @click='file = item'>
              <v-icon color="blue accent-4">mdi-folder-open</v-icon>
            </v-btn>
            <v-btn fab small elevation="0" @click='deleteFile(item.file_id)'>
              <v-icon color="red">mdi-delete-forever</v-icon>
            </v-btn>
          </div>
        </template>
<!--        追加到列表下面-->
        <template v-slot:body.append v-if="selected.length !== 0">
          <v-btn @click='batchDelete' class='mt-3 mb-3 ml-4' color='orange darken-1'>批量删除</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

import {http} from "../utils/http";

export default {
  name: "fileTable",
  data() {
    return {
      snackbar: {
        show: false,
        timeout: 3000,
        color: '',
        text: ''
      },
      // 搜索
      search: '',
      // 被选中的文件
      selected: [],
      // 文件详情
      file: null,
    }
  },
  props: {
    headers: Array,
    file_list: Array,
  },
  computed: {
    file_list_computed: function () {
      return this.file_list;
    }
  },
  methods: {
    // 删除单个
    async deleteFile(file_id) {
      const response = await http({
        url: '/data/deleteFile',
        method: 'delete',
        data: {
          file_id,
        }
      });
      if (response.data.code === 808) {
        this.snackbar.show = true;
        this.snackbar.color = 'success'
        this.snackbar.text = '删除成功'
        // 触发事件给父组件,父组件处理数据,然后子组件再根据数据刷新界面
        this.$bus.$emit('fileHandle', { type: 'delete', file_id} )
        for (let index in this.file_list_computed) {
          if (this.file_list_computed[index].file_id == file_id) {
            this.file_list_computed.splice(index, 1)
          }
        }
      } else {
        this.snackbar.show = true;
        this.snackbar.color = 'error';
        this.snackbar.text = '删除失败';
      }
    },
    // 批量删除
    async batchDelete() {
      let file_list = []
      for (let item of this.selected) {
        file_list.push(item.file_id)
      }
      const response = await http({
        url: '/data/bulkDelete',
        method: 'delete',
        data: {
          file_list
        }
      })
      this.snackbar.show = true;
      this.snackbar.color = 'success';
      this.snackbar.text = response.data.message
      for (let item of response.data.data) {
        //通知父组件处理下
        this.$bus.$emit('fileHandle', {type: 'delete', file_id: item})
        for (let index in this.file_list_computed) {
          if (this.file_list_computed[index].file_id == item) {
            this.file_list_computed.splice(index, 1)
          }
        }
      }
      this.selected = [];
    }
  }
}
</script>

<style lang="scss" scoped>
.file-box {
  height: 80px;
  width: 80px;
  margin: 5px;
  background-position: center;
  background-size: cover;
}
</style>
