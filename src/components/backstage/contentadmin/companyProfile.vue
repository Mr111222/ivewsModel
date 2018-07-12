<template>
  <div class="project-list">
    <Breadcrumb :style="{margin: '14px 24px'}">
      <BreadcrumbItem>企业介绍</BreadcrumbItem>
    </Breadcrumb>
    <div ref="listContainer" class="container">
      <Row class="m-t-10">
        <Col span="24" class="text-right">
          <Button type="warning" style="width:80px;" @click="tocompanyedit()">新建</Button>
        </Col>
      </Row>
      <Row class="m-t-10">
        <Col span="24">
        <Table :loading="isLoading" id="pro_table" size="small" stripe :columns="columns" :data="list"></Table>
        </Col>
      </Row>
      <Row class="m-t-10 text-center">
        <Col>
        <Page :total="total" show-elevator show-total :page-size="pageSize" @on-change="getLists"></Page>
        </Col>
      </Row>
      <Modal v-model="isShowDelProject" width="360" :closable="false" id="mol"  :mask-closable="false">
        <div style="text-align:center">
          <p class="p1" style="font-size:1.2em;text-align:center;margin:5px 0;">
            确定要删除吗？
          </p>
        </div>
        <div slot="footer" style="color:#f60;text-align:center">
          <Button size="large" @click="cancel1">取消</Button>
          <Button type="error" size="large"  @click="confirm1">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      let _this = this;
      return {
        value4:"",
        value6:"",
        list: [],
        isShowDelProject:false,
        projectid:"",
        singer:false,
        total:0,
        pageSize:0,
        pageIndex:1,
        value:"",
        ids:'',
        columns: [
          {
            type: "index",
            width: 60,
            align: "center",
            title: "序号"
          },
          {
            title: "姓名",
            align: "center",
            key: "userName"
          },
          {
            title: "拼音",
            align: "center",
            key: "userNamePinyin",
          },
          {
            title: "性别",
            align: "center",
            key: "genderStr",
          },
          {
            title: "阳历生日",
            align: "center",
            key: "birthdayStr",
          },
          {
            title: "测试时间",
            align: "center",
            key: "dateStr",
          },
          // {
          //   title: "状态",
          //   align: "center",
          //   render:(h,params) => {
          //     return h("div",[
          //       h("span",
          //         params.row.status == 1?"已显示":"未显示"
          //       )
          //     ])
          //   }
          // },
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
                            path: "/backstage/jxbg",
                            query:{
                              id:params.row.id,
                              name:params.row.userName,
                              gender:params.row.gender,
                              userNamePinyin:params.row.userNamePinyin,
                              birthday:params.row.birthdayStr,
                              status:params.row.status
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  ),
                ]),
              ])
            }
          }
        ]
      };
    },
    methods: {
      tocompanyedit(){
        this.$router.replace({path: "/backstage/companyedit"});
      },
      goSelected(e){
        if(e == 0){
          this.tool.post(
            {
              url: "https://www.liangzixiaoying.cn/report/simpleReportList",
              data: {
                pn: this.pageIndex,
                status:null
              },
              success(data) {
                this.pageSize=data.list.pageSize;
                this.total=data.list.total;
                this.list=data.list.list;
                this.total=this.list.length;
                this.$nextTick(() => (this.isLoading = false));
              }
            },
            this
          );
        }else{
          this.tool.post(
            {
              url: "https://www.liangzixiaoying.cn/report/simpleReportList",
              data: {
                pn: this.pageIndex,
                status:e
              },
              success(data) {
                this.pageSize=data.list.pageSize;
                this.total=data.list.total;
                this.list=data.list.list;
                this.total=this.list.length;
                this.$nextTick(() => (this.isLoading = false));
              }
            },
            this
          );
        }
      },
      getproject(){
        this.isLoading = true;
        this.tool.post(
          {
            url: "https://www.liangzixiaoying.cn/report/simpleReportList",
            data: {
              pn: this.pageIndex,
              title:this.value4
            },
            success(data) {
              this.pageSize=data.list.pageSize;
              this.total=data.list.total;
              this.list=data.list.list;
              this.$nextTick(() => (this.isLoading = false));
            }
          },
          this
        );
      },
      cancel1(){
        this.isShowDelProject=false;
        return false;
      },
      // all_Gun(){
      //   let _this = this;
      //   //todo 从数据库删除该组，回到小组列表页面
      //   _this.tool.delete(
      //     {
      //       url: `/dailyAdmin/content/delArticle/${_this.ids}`,
      //       success(data) {
      //         _this.$Message.success({
      //           content: "已成功删除该小组",
      //           onClose() {
      //             location.reload(true);
      //           }
      //         });
      //       }
      //     },
      //     this
      //   );
      // },
      getList(){
        this.tool.post(
          {
            url: "https://www.liangzixiaoying.cn/report/simpleReportList",
            data:{
              pn:this.pageIndex
            },
            success(data) {
              console.log(data);
              this.pageSize=data.list.pageSize;
              this.total=data.list.total;
              this.list=data.list.list;
              this.$nextTick(() => (this.isLoading = false));
            }
          },
          this
        );
      },
      getLists(e){
        this.pageIndex = e;
        if (this.value4) {
          this.getproject();
        }else{
          this.getList();
        }
      }
    },
    mounted() {
      this.$refs.listContainer.style.minHeight =
        document.documentElement.clientHeight - 121 + "px";
      this.getList();
    }

  }
</script>
<style lang="less" scoped>
  .project-list {
    .container {
      padding: 10px 18px;
      background-color: #fff;
      .ivu-table-row{
        height:60px;
        line-height:25px;
      }
      .search{
        width: 300px;
        border:none;
        button{
          background: #FF8247;
        }
      }
      .pu{
        .ivu-table-cell{
          width:32px;
          line-height:40px;
          margin-left:0;
          margin-right:0;
          text-align:center;
        }
      }
    }
  }

  .point-main{
    cursor:pointer;
  }
  .pro_member ul{
    width:380px;
    height:350px;
    margin:20px auto;
    display:flex;
    flex-wrap:wrap;
  }
  .every_member{
    width:120px;
    height:30px;
    font-size:1.2em;
    text-align:center;
  }
</style>
