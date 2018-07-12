<template>
  <div class="user-list">
    <Breadcrumb :style="{margin: '14px 24px'}">
      <BreadcrumbItem>店铺管理</BreadcrumbItem>
    </Breadcrumb>
    <div ref="listContainer" class="container">
      <Row>
        <Col span="12" class="text-left">
          <Input v-model="value4" class="search" @input="getuser()" icon="ios-search" placeholder="分店店名/地址/电话/店长"></Input>
        </Col>
        <Col span="12" class="text-right">
          <Button type="warning" style="width:80px;" @click="tomrenbianji()">添加分店</Button>
        </Col>
      </Row>
      <Row class="m-t-10">
        <Col span="24">
        <Table :loading="isLoading" id="pro_table" size="small" stripe :columns="columns" :data="list"></Table>
        </Col>
      </Row>
      <Row class="m-t-10 text-center">
        <Col>
        <Page :total="total" show-elevator show-total :page-size="pageSize" @on-change="getList"></Page>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value4:"",
        content:"",
        list: [],
        isLoading: false,
        pageIndex:1,
        total:0,
        pageSize:0,
        userid:"",
        username:"",
        columns: [
          {
            title: "分店店名",
            align: "center",
            key:"outTradeNo"
          },
          {
            title: "分店地址",
            width:280,
            align: "center",
            key:"name"
          },
          {
            title: "分店电话",
            align: "center",
            key:"orderResult"
          },
          {
            title: "分店店长",
            align: "center",
            key:"cashFee"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("span",[
                  h(
                    "a",
                    {
                      domProps: {
                        href:"javascript:void(0);",
                        className: "color-main"
                      },
                      on: {
                        click: () => {
                          _this.$router.replace({
                            path: "/backstage/mrenbianji",
                            query:{id:params.row.id}
                          });
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "span",
                    {
                      domProps: {
                        className: "color-main"
                      },
                    },
                    " / "
                  ),
                  h(
                    "a",
                    {
                      domProps: {
                        href: "javascript:void(0);",
                        className: "color-main"
                      },
                      on: {
                        click: () => {
                          this.isShowDel=true;
                        }
                      }
                    },
                    " 删除"
                  )
                ]),
              ])
            }
          }
        ]
      }
    },
    methods: {
      getuser(){
        this.isLoading = true;
        this.tool.post(
          {
            url: "/order/list",
            data: { pn: this.pageIndex,search:this.value4},
            success(data) {
              this.total = data.list.total;
              this.pageSize = data.list.pageSize;
              this.list = data.list.list;
              this.$nextTick(() => (this.isLoading = false));
            }
          },
          this
        );
      },
      getusers(){
        this.isLoading = true;
        this.tool.post(
          {
            url: "/manage/cakeomiseilist",
            data: {
              pn: this.pageIndex,
            },
            success(data) {
              this.total = data.list.total;
              this.pageSize = data.list.pageSize;
              this.list = data.list.list;
              this.$nextTick(() => (this.isLoading = false));
            }
          },
          this
        );
      },
      getList (val){
        this.pageIndex = val;
        if(this.value4){
          this.getuser();
        }else{
          this.getusers();
        }
      },
    },
    mounted() {
      this.$refs.listContainer.style.minHeight =
        document.documentElement.clientHeight - 181 + "px";
      this.getusers();
    }
  }
</script>

<style scoped lang="less">
  .user-list {
    .container {
      padding: 10px 18px;
      background-color: #fff;
      .search{
        width: 300px;
        border:none;
        button{
          background: #FF8247;
        }
      }
    }
    .p1{
      font-size:1.2em;
      text-align:left;
    }
  }
</style>
