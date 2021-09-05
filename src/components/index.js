import fileTable from './fileTable'
import fileShow from "./fileShow";

const components = [
  fileTable,
  fileShow,
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
