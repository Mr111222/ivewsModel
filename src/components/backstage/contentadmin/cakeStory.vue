<template>
  <div class="project-list">
    <Breadcrumb :style="{margin: '14px 24px'}">
      <BreadcrumbItem>蛋糕故事</BreadcrumbItem>
      <BreadcrumbItem>热卖精选</BreadcrumbItem>
    </Breadcrumb>
    <div ref="listContainer" class="container">
      <Row class="m-t-10">
        <Col span="24" class="text-left">
          <Button type="default" style="width:100px;margin-left:20px;">热卖精选</Button>
          <Button type="default" style="width:100px;margin-left:20px;">生日类型</Button>
          <Button type="default" style="width:100px;margin-left:20px;">纪念日类型</Button>
          <Button type="default" style="width:100px;margin-left:20px;">庆典类型</Button>
          <Button type="default" style="width:100px;margin-left:20px;">其他类型</Button>
          <Button type="default" style="width:100px;margin-left:20px;">待处理订单</Button>
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
        items:["未显示","已显示","全部"],
        genders:["全部","男","女"],
        cityList2:["全部","整盘解读","提问"],
        cityList3:["全部","已解析","待解析"],
        value4:"",
        value6:"",
        list: [],
        isShowDelProject:false,
        projectid:"",
        singer:false,
        value:"",
        ids:'',
        columns: [
          {
            type: "index",
            width: 80,
            align: "center",
            title: "序号"
          },
          {
            title: "标题",
            align: "center",
            key: "userName"
          },
          {
            title: "收礼人信息",
            align: "center",
            key: "userNamePinyin",
          },
          {
            title: "送礼人",
            align: "center",
            key: "genderStr",
          },
          {
            title: "关系",
            align: "center",
            key: "birthdayStr",
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
      };
    },
    methods: {
      goSelected(e){
        if(e == 0){
          this.tool.post(
            {
              url: "https://www.liangzixiaoying.cn/report/depthReportList",
              data: {
                pn: this.pageIndex,
                gender:null
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
              url: "https://www.liangzixiaoying.cn/report/depthReportList",
              data: {
                pn: this.pageIndex,
                gender:e
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
      goSelecteds(e){
        if(e == 0){
          this.tool.post(
            {
              url: "https://www.liangzixiaoying.cn/report/depthReportList",
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
              url: "https://www.liangzixiaoying.cn/report/depthReportList",
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
      goSelectedss(e){
        if(e == 0){
          this.tool.post(
            {
              url: "https://www.liangzixiaoying.cn/report/depthReportList",
              data: {
                pn: this.pageIndex,
                analysisStatus:null
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
              url: "https://www.liangzixiaoying.cn/report/depthReportList",
              data: {
                pn: this.pageIndex,
                analysisStatus:e
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
            url: "https://www.liangzixiaoying.cn/report/depthReportList",
            data: {
              pn: this.pageIndex,
              title:this.value4
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
            url: "https://www.liangzixiaoying.cn/report/depthReportList",
            data:{
              pn:1
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
      },
      getLists(e){
        this.pageIndex = e
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
