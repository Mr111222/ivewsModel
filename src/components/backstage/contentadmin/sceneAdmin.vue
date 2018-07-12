<template>
  <div class="project-list">
    <Breadcrumb :style="{margin: '14px 24px'}">
      <BreadcrumbItem>数字含义</BreadcrumbItem>
    </Breadcrumb>
    <div ref="listContainer" class="container">
      <Row class="m-t-10">
        <Col span="24">
        <Table  id="pro_table" size="small" stripe :columns="columns" :data="list"></Table>
        </Col>
      </Row>
      <Modal v-model="isShow" width="360" :closable="false" id="mol" @on-ok="asyncOK" :mask-closable="false">
        <div style="text-align:center">
         <!--<p><span >原数字类型</span><span style="margin-left: 200px">生命数字</span></p>-->
          <p><input type="text" v-model="value5" style="width: 250px"/></p>
          <p><input type="text" v-model="value6" style="width: 250px"/></p>
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
        value5:'',
        list: [],
        isShow:false,
        projectid:"",
        singer:false,
        value:"",
        ids:'',
        columns: [
          {
            title: "数字",
            align: "center",
            key: "type"
          },
          {
            title: "数字类型",
            align: "center",
            key: "typeName"
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
                            path: "/backstage/mxindetail",
                            query:{id:params.row.type}
                          });
                        }
                      }
                    },
                    "查看"
                  ),
                  h(
                    "span",
                    {
                      domProps: {
                        className: "color-main"
                      },
                    },
                    "/"
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
                          _this.isShow=true;
                          _this.value5=params.row.id;
                          _this.value6=params.row.typeName;

                        }
                      }
                    },
                    "修改"
                  )
                ]),
              ])
            }
          }
        ]
      };
    },
    methods: {
      asyncOK(){
        this.tool.post({
          url:'https://www.liangzixiaoying.cn/mingNum/editType',
          data:{
            id:this.value5,
            typeName:this.value6
          },
          success(res){
            console.log(res)
          }
        },this)
      },

      getList(){
        this.tool.get(
          {
            url: "https://www.liangzixiaoying.cn/mingNum/typeList",
            success(data) {
              this.list = data.mingNumberTypes
            }
          },
          this
        );
      },

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
