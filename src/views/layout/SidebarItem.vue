<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in routes">
      <el-submenu :index="item.title" :key="index">
        <template slot="title" @click="toUrl(item.href)">
          <icon-svg v-if="item.icon" :icon-class="item.icon"></icon-svg>
          <span>{{item.title}}</span>
        </template>
        <template v-for="(child,index2) in item.children">
          <el-menu-item :index="child.title" :key="index2" @click="toUrl(child.href)">
            <icon-svg v-if="child.icon" :icon-class="child.icon"></icon-svg>
            <span>{{child.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  },
  methods: {
    toUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

