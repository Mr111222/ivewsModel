<template>
    <div class="user-list">
        <Breadcrumb :style="{margin: '14px 24px'}">
          <BreadcrumbItem>用户列表</BreadcrumbItem>
        </Breadcrumb>
        <div ref="listContainer" class="container">
          <Row>
            <Col span="24" class="text-right">
              <Input v-model="value4" class="search" @input="getuser()" icon="ios-search" placeholder="用户名">
              </Input>
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
               type: "index",
               width: 60,
               align: "center",
               title: "序号"
             },
             {
               title: "用户",
               align: "center",
               key:"nickname"
             },
             {
               title: "注册时间",
               align: "center",
               key: "createTimeStr",
             }
       ]
     }
   },
   methods: {
     getuser(){
       this.isLoading = true;
       this.tool.post(
         {
           url: "https://www.liangzixiaoying.cn/users/list",
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
             url: "https://www.liangzixiaoying.cn/users/list",
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
     // cancel1(){
     //   this.isShowToBlack=false;
     //   return false;
     // },
     // confirm1(){
     //   let _this=this;
     //   _this.isShowToBlack=false;
     //   _this.tool.post(
     //     {
     //       url: "/usermanage/blackadd",
     //       data: { userid: _this.userid,reason:_this.content},
     //       success(data) {
     //         console.log(data);
     //         _this.$Message.success({
     //            content: "已处理",
     //            onClose() {
     //              location.reload(true);
     //            }
     //         });
     //       }
     //     },
     //     this
     //   );
     // },
     // delUser () {
     //   let _this=this;
     //   _this.isShowDelUser = false;
     //   _this.tool.get(
     //     {
     //       url: "/usermanage/deleteuser",
     //       data:{userid:this.userid},
     //       success(data) {
     //         _this.$Message.success({
     //           content: "删除成功",
     //           onClose() {
     //             location.reload(true);
     //           }
     //         });
     //       }
     //     },
     //     this
     //   );
     // },
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
