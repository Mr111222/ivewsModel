<template>
  <div class="project-list">
    <Breadcrumb :style="{margin: '14px 24px'}">
      <BreadcrumbItem>名人列表</BreadcrumbItem>
    </Breadcrumb>
    <div ref="listContainer" class="container">
      <!-- add  model -->
      <button @click="getFn">登陆</button>
       <Modal v-model="cashManageItem.cashManagemodal" :closable="false" :mask-closable="false" width="736">
                 <p slot="header" style="color:#2d8cf0;text-align:center">
                     <Icon type="information-circled"></Icon>
                     <span>{{ cashManageItem.title }}</span>
                 </p>
                 <Form ref="cashManageItemRef" :model="cashManageData"  inline :label-width="140">
                     <FormItem label="新增蛋糕类型：" prop="cakeName" class="selectWidth">
                         <span v-if="cashManageItem.isSee" class="showSpan">{{ cashManageData.cakeName || '空' }}</span>
                         <Input v-else v-model="cashManageData.cakeName" placeholder="请输入蛋糕类型"></Input>
                     </FormItem>
                     <div>
                        <span>蛋糕图片：</span>
                        <!--
                        <Upload
                          ref="upload"
                          :show-upload-list="false"
                          :default-file-list="defaultList"
                          :on-success="handleSuccess"
                          :format="['jpg','jpeg','png']"
                          :max-size="2048"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :before-upload="handleBeforeUpload"
                          multiple
                          type="drag"
                          action="//jsonplaceholder.typicode.com/posts/"
                          style="display: inline-block;width:58px;">
                          <div style="width: 58px;height:58px;line-height: 58px;">
                              <Icon type="camera" size="20"></Icon>
                          </div>
                        </Upload>   
                        -->                
                     </div>
                      <FormItem label="蛋糕尺寸：" prop="cakeSizeChoice" class="selectWidth">
                         <RadioGroup v-model="cashManageData.cakeSizeChoice" @on-change="getPrice(cashManageData.cakeSizeChoice)">
                            <Radio 
                            v-for="item,index in cakeSize" 
                            :key="index" 
                            :label="item.size"
                            ></Radio>
                            <Button size="small" @click="addSize">新增</Button>
                         </RadioGroup>
                     </FormItem>
                     <FormItem label="蛋糕价格：" prop="cakePrice" class="selectWidth">
                         <span v-if="cashManageItem.isSee" class="showSpan">{{ cashManageData.cakePrice || '空' }}</span>
                         <Input v-else v-model="cashManageData.cakePrice"></Input>
                     </FormItem>
                 </Form>
                
                 <div slot="footer" style="text-align:center">
                     <div v-if="cashManageItem.isSee">
                         <Button type="primary" @click="cancelCash">关闭</Button>
                     </div>
                     <div v-else>
                         <Button type="primary" @click="determine('cashManageItemRef', cashManageItem, cashManageData)">确定</Button>
                         <Button type="ghost" @click="cancelCash">取消</Button>
                     </div>
                 </div>
      </Modal>
      <!-- size  model -->
       <Modal v-model="sizeItem.sizeManagemodal" :closable="false" :mask-closable="false" width="736">
         <p slot="header" style="color:#2d8cf0;text-align:center">
             <Icon type="information-circled"></Icon>
             <span>{{ sizeItem.title }}</span>
         </p>
         <Form ref="cashManageItemRefsize" :model="cashManageData"  inline :label-width="140">
             <FormItem label="新增蛋糕尺寸：" prop="size" class="selectWidth">
                 <span v-if="cashManageItem.isSee" class="showSpan">{{ sizeItemData.size || '空' }}</span>
                 <Input v-else v-model="sizeItemData.size" placeholder="请输入蛋糕尺寸"></Input>
             </FormItem>
             <FormItem label="新增蛋糕价格：" prop="price" class="selectWidth">
                 <Input v-model="sizeItemData.price" placeholder="请输入蛋糕价格"></Input>
             </FormItem>
         </Form>
        
         <div slot="footer" style="text-align:center">
             <div v-if="cashManageItem.isSee">
                 <Button type="primary" @click="cancelCash">关闭</Button>
             </div>
             <div v-else>
                 <Button type="primary" @click="addSizeSure">确定</Button>
                 <Button type="ghost" @click="addSizeClose">取消</Button>
             </div>
         </div>
      </Modal>
      <Row class="m-t-10">
        <Col span="12" class="text-left">
          <Button type="warning" style="width:80px;" @click="tomrenbianji()">新建</Button>
        </Col>
      </Row>
     
      <Row class="m-t-10">
        <Col span="24">
        <Table  id="pro_table" size="small" stripe :columns="columns" :data="list1"></Table>
        </Col>
      </Row>
       
      <Modal v-model="isShowDel" width="360" :closable="false" id="mol"  :mask-closable="false">
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
    isShowDel:false,
    projectid:"",
    singer:false,
    pageIndex:1,
    total:0,
    pageSize:0,
    value:"",
    ids:'',
    list1:[],
    list2:[],
    cakeSize: [],
    cakeSize1: [{size: '6寸（2-4人）', price:'12'}, {size: '8寸（4-6人）', price:'1100'}, {size: '10寸（6-8人）', price:'200'}, {size: '12寸（8-12人）', price:'500'}, {size: '14寸（20人）', price:'55'}],
    arrs:[],
    cashManageItem: {
         cashManagemodal: false,
         totalEntries: 0,
         loading: true,
         title: '',
         isSee: false,
         isBuild: false,
         editIndex: null,
         lendProductAll: [], /* 所有产品 */
         productName: '', /* 产品名称 */
         code: '', /* 产品编号 */
         id: '', /* 产品ID */
    },
    cashManageData: {
         cakeName: '', /* 名字 */
         cakeSizeChoice: '', /* 尺寸 */
         cakePrice: '', /* 价格 */
         typeId:''
    },
    sizeItem: {
      sizeManagemodal: false,
      isSee: false,
      title: ''
    },
    sizeItemData: {
      size:'',
      price:''
    },
    columns: [
      {
        title: "蛋糕类型",
        align: "center",
        key: "cakeTypename"
      },
      {
        title: "可选尺寸",
        align: "center",
        key: "sizeName"
      },
      {
        title: "价格(元)",
        align: "center",
        key: "price",
      },
      /*{
        title: "描述",
        align: "center",
        key: "content",
      },*/
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
                      this.cashManageItem.cashManagemodal = true
                      this.cashManageItem.title = '编辑蛋糕类型'
                      this.cashManageItem.isSee = false
                      this.cashManageData.cakeName = params.row.cakeTypename
                      this.cashManageData.cakeSizeChoice = params.row.sizeName
                      this.cashManageData.cakePrice = params.row.price
                      this.cashManageData.typeId = params.row.typeId
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
                        this.tool.delete({
                            url: "http://dangao.rongguo.top/manage/caketype/"+params.row.typeId,
                            success(res) {
                              this.$Message.info('删除成功！');
                              this.getList();
                            }
                          },
                          this
                        );
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
  //news
  tomrenbianji(){
    this.cashManageItem.cashManagemodal = true
    this.cashManageItem.title = '新增蛋糕类型'
    this.cashManageItem.isSee = false
    this.cashManageItem.isBuild = true
    this.cashManageItem.editIndex = null
  },
  determine (name,item,data) {
    if(item.title === '新增蛋糕类型'){
      var _num = Math.floor(Math.random()*100+1)
      if(data){
        let _this = this;
        this.tool.post({
            url: "http://dangao.rongguo.top/manage/caketype",
            data: {
              "typeName":data.cakeName,
              "cakeImg":"http://www.baidu.com",
              "cakeSizeList":[{"sizeName":data.cakeSizeChoice,"price":data.cakePrice}]
            },
            success(res) {
              this.$Message.info('添加成功！');
              this.getList()
            }
          },
          this
        );
      }
    }else if(item.title === '编辑蛋糕类型'){
      this.tool.put({
          url: "http://dangao.rongguo.top/manage/caketype/"+data.typeId,
          data: {
              "typeName":data.cakeName,
              "cakeImg":"http://www.baidu.com",
              "cakeSizeList":[{"sizeName":data.cakeSizeChoice,"price":data.cakePrice}]
            },
          success(res) {
            this.$Message.info('修改成功！');
            this.getList()
          }
        },
        this
      );
    }
    this.cashManageItem.cashManagemodal = false
    this.$nextTick(() => (this.$refs['cashManageItemRef'].resetFields()));

  },
  cancelCash () {
    this.cashManageItem.cashManagemodal = false
    this.$nextTick(() => (this.$refs['cashManageItemRef'].resetFields()));

  },
  addSize() {
    this.sizeItem.sizeManagemodal = true;
    this.sizeItem.title = '新增尺寸价格';
  },
  getPrice(x){
   this.cakeSize.forEach((item)=>{
    if(item.size == x){
      this.cashManageData.cakePrice = item.price
    }
   })
  },
  addSizeSure() {
    this.cakeSize.push({
      size:this.sizeItemData.size,
      price:this.sizeItemData.price
    })
    console.log(this.cakeSize,2222)
    this.sizeItem.sizeManagemodal = false;
    this.$nextTick(() => (this.$refs['cashManageItemRefsize'].resetFields()));
  },
  addSizeClose() {
    this.sizeItem.sizeManagemodal = false;
    this.$nextTick(() => (this.$refs['cashManageItemRefsize'].resetFields()));

  },
  getFn()  {
        let _this = this;
        _this.tool.post({
            url: "http://dangao.rongguo.top/manage/login",
            data:{
              "email":"fendian@163.com",
              "password":"12345"
            },
            success(res) {
              console.log(res)
            }
          },
          _this
        );
  },
  getRes (person){
    let objs = {};
    person = person.reduce((cur,next) => {
        objs[next.price] ? "" : objs[next.price] = true && cur.push(next);
        return cur;
    },[]) //设置cur默认类型为数组，并且初始值为空的数组
    return person
  },

  //news end.....
  getLists(val){
     this.pageIndex=val;
  },
  cancel1(){
     this.isShowDel=false;
     return false;
  },
  confirm1(){
     this.isShowDel=false;
     this.tool.delete({
       url:`https://www.liangzixiaoying.cn/meiJinnManage/delMeiJinn/${2}`,
       success(res){
         this.$Message.success({
           content: "已成功删除",
           onClose() {
             location.reload(true);
           }
         });
       }
     },this)
  },
  getList(){
  this.list1 = [];
   this.tool.get(
     {
       url: "http://dangao.rongguo.top/manage/caketypelist",
       success(data) {
         //this.pageSize=data.list.pageSize;
         //this.total=data.list.total;
          var zz = [];
          var cakeSize = [];
          for (var i in data.dataMap){
            data.dataMap[i] = this.getRes(data.dataMap[i])
            data.dataMap[i].forEach((item,index)=>{
              this.list1.push({
                key:i,
                sizeId: item.sizeId,
                sizeName: item.sizeName,
                typeId: item.typeId, 
                price: item.price, 
                cakeTypename: item.cakeTypename
              })


              cakeSize.push({
                size:item.sizeName,
                price:item.price
              })
            })
          }
          //this.cakeSize = this.getRes(cakeSize)
          this.cakeSize = cakeSize
        }        
     },
     this
   );
  }
},
created() {
  this.getFn();
  this.getList();

},
mounted() {
    this.$refs.listContainer.style.minHeight =
      document.documentElement.clientHeight - 121 + "px";
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
