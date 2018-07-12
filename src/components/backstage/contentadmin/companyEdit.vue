<template>
  <div class="user-list">
    <Breadcrumb :style="{margin: '14px 24px'}">
      <BreadcrumbItem to="/backstage/companyprofile">企业介绍 </BreadcrumbItem>
      <BreadcrumbItem>{{title11}}</BreadcrumbItem>
    </Breadcrumb>
    <div ref="listContainer" class="container">
      <Row class="m-t-10">
        <Col span="18" offset="1">
        <Form ref="DataDiction" :model="dic"  :label-width="100" show-message>
          <FormItem label="数字">
            <span>{{type}}</span>
          </FormItem>
          <FormItem label="内容">
            <i-input v-model="input1" @on-blur="changeCount(input1)" type="textarea" :autosize="{minRows: 2,maxRows: 20}"></i-input>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <Row class="m-t-30 m-b-30">
        <Col span="12" offset="3">
        <Button style="margin-left:20px;" type="warning" size="large" @click="save()" class="m-r-20" :loading="isSubmitLoading">完成</Button>
        <Button type="default" size="large" @click="back()" class="m-r-20" :loading="isSubmitLoading">取消</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import Config from "../../../common/js/config";
  export default {
    data(){
      return {
        type:'',
        id:'',
        number:'',
        analysis:'',
        config: Config,
        title11:"",
        gender:null,
        input4:'',
        input1:'',
        input2:'',
        input3:'',
        dic:{},
        ids:"",
        isSubmitLoading:false,
        addTitle:"",
        addNames:[],
        populationtypes:[],
        delname:{},
        delname1:{},
        file:{},
        defaultList: [],
        defaultList1:[],
        uploadList: [],
        uploadLists: [],
        fileName:"",
        imageurl:"",
        datee:''
      }
    },
    methods: {
      save(){
        this.tool.post({
          url:'https://www.liangzixiaoying.cn/mingNum/edit',
          data:{
            id:this.id,
            number:this.number,
            type:this.type,
            analysis:this.input1
          },
          success(res){
            console.log(res);
          }
        },this)
      }
    },
    mounted() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      this.number = this.$route.query.number
      this.analysis = this.$route.query.analysis;
      this.input1 = this.analysis
      console.log(this.ids);
      this.$refs.listContainer.style.minHeight =
        document.documentElement.clientHeight - 181 + "px";
        if(this.$route.query.id){
          this.getList();
          this.title11="编辑";
        }else {
          this.title11="新建";
        }
    },
  }
</script>

<style lang="less">
  .user-list {
    .container {
      padding: 10px 18px;
      background-color: #fff;
      .ivu-form-item-label{
        font-size:1.2em;
        .ivu-form-item-content {
          font-size:1.2em;
        }
      }

      .labeldy{
        .ivu-form-item-label{
          margin-left:-10px;
        }
        a {
          display: inline-block;
          min-width:70px;
          padding: 0px 5px;
          border: 1px solid #F6F8FA;
          margin-right: 10px;
          color:#00c79b;
          position:relative;
          .ivu-icon {
            color: #00c79b;
            display: inline;
            line-height:32px;
            position:absolute;
            right:8px;
          }
        }
      }
    }

  }
  .demo-upload-img:hover .demo-upload-img-cover{
    display:block;
  }
  .demo-upload-list{
    display: block;
    width: 220px;
    height: 220px;
    text-align: center;
    margin-top:20px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
</style>

