<template>
  <div>
    <file-table :file_list="image_list" :headers="headers"></file-table>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  //注意不能用image
  name: "imageTable",
  data() {
    return {
      // 列表数据
      image_list:[],
      // 表头
      headers: [
        {text: '文件', value: 'file_mini'},
        {text: '名称', value: 'file_name'},
        {text: '大小', value: 'file_size'},
        {text: '上传时间', value: 'file_time'},
        {text: '收藏夹', value: 'file_folder'},
        {text: '操作', value: 'handle'},
      ]
    }
  },
  mounted() {
    // 获取list
    this.init();
    //监听子组件事件
    this.$bus.$on('fileHandle', this.fileHandle);
    this.$bus.$on('upload', this.fileUpload);
  },
  methods: {
    async init() {
      const response = await http({
        url: '/data/getImageData',
        method: 'get'
      });
      if (response.data.code === 800) {
        this.image_list = response.data.data;
      } else if (response.data.code === 813) {
        this.$store.commit('message', {color: 'primary', text:'数据为空'})
      } else{
        this.$store.commit('message', {color:'error', text:'数据加载失败'})
      }
    },
    // 界面修改是父组件做的,而后台数据删除则是具体子组件做的
    fileHandle(arg) {
      const {type, file_id, file_memo, file_folder, folder_name} = arg;
      if (type == 'delete') {
        for (let index in this.image_list) {
          if (this.image_list[index].file_id == file_id) {
            this.image_list.splice(index, 1);
            break;
          }
        }
      } else if (type == 'edit') {
        for (let index in this.image_list) {
          if (this.image_list[index].file_id == file_id) {
            this.image_list[index].file_memo = file_memo;
            break;
          }
        }
      } else if (type == 'deleteFolder') {//移除文件的收藏夹属性
        for (let index in this.image_list) {
          if (this.image_list[index].file_folder == folder_name) {
            this.image_list[index].file_folder = '';
            break;
          }
        }
      } else {//修改收藏夹
        for (let index in this.image_list) {
          if (this.image_list[index].file_id == file_id) {
            this.image_list[index].file_folder = file_folder;
            break;
          }
        }
      }
    },
    //文件上传时,压入image_list
    fileUpload(arg) {
      for (let item of arg) {
        if (/image/.test(item.file_type)) {
          this.image_list.unshift(item);
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
