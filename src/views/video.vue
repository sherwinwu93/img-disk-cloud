<template>
  <div>
    <file-table :file_list='video_list' :headers="headers"></file-table>
  </div>
</template>

<script>
import {http} from "../utils/http";

export default {
  name: "videoTable",
  data() {
    return {
      video_list: [],
      headers: [
        { text: "文件" ,value:'file_mini'},
        { text: "名称" ,value:'file_name'},
        { text: "大小" ,value:'file_size'},
        { text: "上传时间" ,value:'file_time'},
        { text: "收藏夹" ,value:'file_folder'},
        { text: "操作" ,value:'handle'},
      ]
    }
  },
  mounted() {
    this.init();
    this.$bus.$on('fileHandle', this.fileHandle);
    this.$bus.$on('upload', this.fileUpload);
  },
  methods: {
    async init() {
      const config = {
        url: "/data/getVideoData",
        method: "get",
      };
      const result = await http(config);
      if (result.data.code == 800) {
        this.video_list = result.data.data;
      } else if (result.data.code == 813) {
        this.$store.commit('message',{color:'primary',text:'数据为空'})
      } else {
        this.$store.commit('message',{color:'error',text:'数据加载失败'})
      }
    },
    fileHandle(arg) {
      const { type, file_id, file_memo, file_folder, folder_name} = arg;
      if (type == "delete") {
        for (let index in this.video_list) {
          if (this.video_list[index].file_id == file_id) {
            this.video_list.splice(index, 1);
            break;
          }
        }
      } else if (type == "edit") {
        for (let index in this.video_list) {
          if (this.video_list[index].file_id == file_id) {
            this.video_list[index].file_memo = file_memo;
            break;
          }
        }
      }else if(type == 'deleteFolder'){
        for (let index in this.video_list) {
          if (this.video_list[index].file_folder == folder_name) {
            this.video_list[index].file_folder = '';
            break;
          }
        }
      } else {
        for (let index in this.video_list) {
          if (this.video_list[index].file_id == file_id) {
            this.video_list[index].file_folder = file_folder;
            break;
          }
        }
      }
    },
    fileUpload(arg){
      // 遍历上传列表中的图片，压入image_list
      for(let item of arg){
        if(/video/.test(item.file_type)){
          this.video_list.unshift(item)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
