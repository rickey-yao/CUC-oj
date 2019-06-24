<template>
  <Sider
    ref="side1"
    hide-trigger
    collapsible
    :collapsed-width="78"
    v-model="isCollapsed"
    :style="{background: '#fff',height:'530px'}"
  >
    <Header :style="{padding: 0, background: '#fff'}" class="layout-header-bar">
      <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 25px'}" type="md-menu" size="24"></Icon>
    </Header>
    <Menu
      :active-name="activeName"
      theme="light"
      width="auto"
      :class="menuitemClasses"
      :style="{padding: '30px 0 0'}"
    >
      <MenuItem name="announcements">
        <Icon type="ios-bookmarks"></Icon>
        <span>公告</span>
      </MenuItem>
      <MenuItem name="practice">
        <Icon type="ios-create"></Icon>
        <span>练习</span>
      </MenuItem>
      <MenuItem name="contest">
        <Icon type="ios-ribbon"></Icon>
        <span>竞赛</span>
      </MenuItem>
      <MenuItem name="rank">
        <Icon type="ios-stats"></Icon>
        <span>排名</span>
      </MenuItem>
      <MenuItem name="Info">
        <Icon type="ios-happy"></Icon>
        <span>概况</span>
      </MenuItem>
    </Menu>
  </Sider>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    activeName () {
      return this.$route.path
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>

<style scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #ffffff;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>