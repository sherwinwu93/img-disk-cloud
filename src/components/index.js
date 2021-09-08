import fileTable from './fileTable'
import fileShow from "./fileShow";
import folderShow from "./folderShow";
import contextMenu from "./contextMenu";

const components = [
  fileTable,
  fileShow,
  folderShow,
  contextMenu,
];

const install = function (Vue) {
  if (install.installed) {
    return
  }
  components.forEach(item => {
    console.log(item.name)
    Vue.component(item.name, item)
  })
}

export default {
  install
}
