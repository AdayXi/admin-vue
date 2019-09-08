<template>
  <el-menu mode="vertical"
           theme="dark"
           :collapse="isCollapse">
    <sidebar-item :routes='permissionMenus'></sidebar-item>
  </el-menu>
</template>


<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'permissionMenus'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  activated() {
    console.log(this.$store.getters.permissionMenus)
    console.log('----------------------------------')
  },
  mounted() {
    console.log(this.$store.getters.permissionMenus)
  }
}
</script>
