<template>
  <el-dialog
    :title="type=='post'?'新建':'修改'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
  >
    <div>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="100px">

        <el-row>
          <el-col :span="12">
            <el-form-item label="账号名称" prop="userName">
              <el-select v-model="dataForm.userId" placeholder="请选择" clearable filterable>
                <el-option v-for="item in eqList" :key="item.id" :label="item.username" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" v-loading="loading" @click="submitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getDictDataList} from '@/utils'
import { isMobile,idCardValidate } from '@/utils/validate'
import debounce from 'lodash/debounce'
import Cookies from 'js-cookie'
import imgClip from '@/components/public/img-clip'
export default {
    components:{ imgClip },
    watch:{
        'dataForm.idcard':{
            immediate:true,
            handler(val){
                let gender='2';
                if(val&&val.length==18){
                    gender=val[16]%2==0?'2':'1';
                }
                this.dataForm.sex=gender
            }
        }
    },
    data(){
        return {
            unitList: [],
            dialogVisible:false,
            loading:false,
            imgLoading:false,
            type:'post',
            dataForm:{
                userId:'',
                userNmae:"",
            },
            genderList:getDictDataList('gender').filter(item=>item.dictValue<2),
            uploadHeaders:{},
          rules: {
            userName: [{
              required: true,
              message: '请输入',
              trigger: ['blur', 'change']
            }],

          },

        }
    },
    created(){
        this.uploadHeaders={
            Authorization:'Bearer ' + Cookies.get('access_token') || ''
        }
        this.getGender()
        this.getUnitList()
        this.getEquipList()
    },
    methods:{
      getEquipList() {
        this.$http({
          url: "/sys/user/getAll",
          method: "get"
        }).then(({
                   data: res
                 }) => {
          if (res.code != 0) {
            return this.$message(res.msg)
          }
          this.eqList = res.data
        })
      },
      getGender(){
        this.$http({url:'/sys/dict/data/getByType?type=gender',method:'get',data:{type : 'gender'}}).then(({ data: res }) => {
          if (res.code !== 0) {
            return
          }

          this.genderList = res.data

        })
      },

        init(data){
            this.dialogVisible=true;
            // 编辑
            if(data){
                this.type="put";
                this.dataForm={
                    ...data,
                    sex:String(data.sex),
                  status:String(data.status),
                }
            }
            else{
                this.type="post";
                this.dataForm={
                      userName:''
                }
                this.$nextTick(()=>{
                  this.$refs['dataForm'].clearValidate()
                })
            }
        },
      // 获取部门列表
      getUnitList () {
        return this.$http.get('/system/unit/all').then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.unitList = res.data
        }).catch(() => {})
      },
        submitInfo:debounce(function(){
            var eqname =  this.eqList.find(item =>item.id==this.dataForm.userId);
            console.log(eqname)
            this.dataForm.userName = eqname.username;
            this.$refs['dataForm'].validate((valid)=>{
              if(!valid){

                return false;
              }
                this.loading=true;
                 this.$http({
                    url:"/system/feven/waring",
                    method:this.type,
                    data:this.dataForm
                }).then(({data})=>{
                    if(data.code!=0){
                        return this.$message.error(data.msg)
                    }
                    this.dialogVisible=false;
                    if(this.type=='post'){
                      this.$parent.$parent.resetQuery();
                    }
                    else{
                      this.$parent.$parent.search();
                    }
                    this.$message.success(data.msg)
                }).finally(()=>{
                  this.loading=false;
                })
            })

        },1000),
        handleUploadSuccess(res){
            this.imgLoading=false;
            if(res.code!=0){
                return this.$message.error(res.msg)
            }
            this.dataForm.scPhotoimg=res.data.path;
        },
        beforeUpload(file){
            const isJPG=file.type=='image/jpeg'||file.type=='image/png';
            const isLess2M=file.size/1024 /1024<2;
            if(!isJPG){
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if(!isLess2M){
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.imgLoading=isJPG && isLess2M;
            return isJPG && isLess2M;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-dialog {
  .el-form {
    .el-form-item {
      .el-date-editor--date,
      .el-select {
        width: 100%;
      }
      /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-left: 20px;
        .avatar-uploader-icon {
          font-size: 28px;
          color: #fff;
          height: 150px;
          width: 106px;
          line-height: 150px;
          text-align: center;
        }
        .avatar {
          height: 150px;
          width: 106px;
          display: block;
        }
      }
    }
  }
}
</style>
