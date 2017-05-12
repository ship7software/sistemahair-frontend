<template>
  <ul class="sidebar-menu">
    <li class="header">MENU</li>
    <li :class="{ 'treeview': item.menus }" v-for="item in items">
      <router-link :to="item.to" @click.native="collapseMenu(item.to)">
        <i :class="['fa', 'fa-' + item.icon ]"></i> <span>{{ item.title }}</span>
        <span class="pull-right-container" v-if="item.menus">
          <i class="fa fa-angle-left pull-right"></i>
        </span>        
      </router-link>
      <ul class="treeview-menu" v-if="item.menus">
        <li v-for="sub in item.menus">
          <router-link :to="sub.to" @click.native="collapseMenu(sub.to)">
            <i :class="['fa', 'fa-' + sub.icon ]"></i>{{ sub.title }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
/* global $ */
export default {
  name: 'MenuMain',
  props: {
    items: Array
  },
  methods: {
    collapseMenu (to) {
      if (to !== '#' && $('body').hasClass('sidebar-open')) {
        $('body').removeClass('sidebar-open')
      }
    }
  }
}
</script>
<style scoped>
  .sidebar-menu li > a > .pull-right-container {
    width: 40px;
    font-size: 20px;
  }
</style>
