<template>
  <div class="backstage">
    <Layout>
      <Header>
        <div class="logo">能说话的蛋糕管理后台</div>
        <div class="right">
          <div class="lang msg">
            <Icon type="ios-person-outline" style="font-size:1.4em;"></Icon>
            <span style="margin:0 5px 0 3px">管理员 </span>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider collapsible :collapsed-width="79" v-model="isCollapsed" ref="workspaceSider">
          <Menu :active-name="activeItem" theme="dark" width="auto" :class="menuitemClasses" @on-open-change="openChange">
            <Submenu v-if="item.children" :name="item.mark" v-for="item in menus" :key="item.mark" @click.native="gotoDetail(item)">
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
              <MenuItem :name="subItem.mark" v-for="subItem in item.children" :key="subItem.mark" @click.native="gotoDetail(subItem)">{{subItem.name}}</MenuItem>
            </Submenu>
            <MenuItem v-if="!item.children" :name="item.mark" v-for="item in menus" :key="item.mark"
                      @click.native="gotoDetail(item)">
              <span>{{item.name}}</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <router-view></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeItem: "1-1",
      isCollapsed: false,
      menus: [
        {
          mark: "1-1",
          name: "内容管理",
          url: "/backstage/companyprofile",
          children:[
            {
              mark:"1-1-1",
              name:"企业介绍",
              url: "/backstage/companyprofile",
            },
            {
              mark:"1-1-2",
              name:"蛋糕故事",
              url: "/backstage/cakestory",
            },
            {
              mark:"1-1-3",
              name:"商品管理",
              url: "/backstage/commodityadmin",
            },
            {
              mark:"1-1-4",
              name:"场景管理",
              url: "/backstage/sceneadmin",
            },
          ]
        },
        {
          mark: "1-2",
          name: "店铺管理",
          url: "/backstage/shoplist"
        }
      ]
    };
  },
  methods: {
    gotoDetail(item) {
      console.log(item.icon);
      this.$router.replace({ path: item.url });
    },
    openChange(item) {
      let openedRootMenu = this.tool.find(this.menus, "mark", item[0]);
      if (
        openedRootMenu &&
        openedRootMenu.children &&
        openedRootMenu.children.length
      ) {
        this.activeItem = openedRootMenu.children[0].mark;
        this.$router.replace(item.url);
      }
    },
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  mounted() {
    this.$refs.workspaceSider.$el.style.minHeight =
      document.documentElement.clientHeight - 168 + "px";
    let selectedMenuItem = this.tool.find(this.menus, "url", this.$route.path);
    this.activeItem =
      selectedMenuItem && selectedMenuItem.mark
        ? selectedMenuItem.mark
        : this.activeItem;
  }
};
</script>
<style lang="less" scoped>
@import "../../common/less/var.less";
.img{
  width: 17px;
}
.backstage {
  /*.covers {*/
    /*margin-left: -15px;*/
    /*.ivu-select-selection {*/
      /*background: initial;*/
      /*border: none;*/
      /*color: #fff;*/
      /*box-shadow: 0px 0px 0px #fff;*/
      /*font-size: 16px;*/
      /*font-weight: bold;*/
      /*.ivu-select-arrow {*/
        /*color: #fff;*/
      /*}*/
    /*}*/
  /*}*/
  .ivu-layout-header {
    background-color: @color;
    line-height: 40px;
    padding-top: 0px;
    padding-bottom: 10px;
  }

  .ivu-layout-header {
    height: 90px;
  }
  .ivu-select {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    color: #495060;
    font-size: 14px;
    line-height: normal;
  }
  .ivu-select-single {
    width: 90px;
  }
  .ivu-select-selection {
    background: transparent;
    border: none;
  }
  .ivu-select-selection {
    background: initial;
    border: none;
    color: #fff;
  }
  .ivu-select-item-selected {
    background: rgba(246, 116, 77, 0.9);
  }

  .layout-con {
    height: 100%;
    width: 100%;
  }
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: center;
    transition: width 0.2s ease 0.2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
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

  .logo {
    color: #fff;
    font-size: 24px;
    width: 50%;
    height: 100%;
    line-height: 80px;
    margin-left:-22px;
    float: left;
  }

  .right {
    width: 50%;
    float: left;
    margin-top:20px;
    .lang {
      color: #fff;
      font-size: 16px;
      text-align: right;

      a {
        color: #fff;
        &.active {
          color: @black;
        }
      }
    }
    .msgs {
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: red;
      position: absolute;
      right: 55px;
      top: 13px;
    }
    .msg {
      text-align: right;
      color: #fff;
      position: relative;

      .btn-logout {
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        display: inline-block;
        background-color: #fff;
        color: @black;
        font-size: 16px;
        margin: 0px 15px;
        border-radius: 2px;
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>


